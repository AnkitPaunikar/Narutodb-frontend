import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Trash, Pencil } from "react-bootstrap-icons";

import { updateDetails, updateImages } from "../services";

import FileUpload from "../component/FileUpload";
import datteimg from "../assets/dattebayo.jpg";

function CharacterDetails() {
  const location = useLocation();
  const [data, setdata] = useState(location.state.data);

  const [formValues, setFormValues] = useState(location.state.data);
  const [readOnlytext, setReadOnlytext] = useState(true);
  const [readEditOnlyCSS, setReadEditOnlyCSS] = useState(
    "form-control-plaintext"
  );

  const setupdatedData = (dat) => {
    setdata(dat);
  };

  const deleteImage = (index) => {
    let image = data.images;
    if (index >= 0 && index < image.length) {
      image.splice(index, 1);
      updateImages(data.id, image)
        .then((res) => setupdatedData(res.data))
        .catch((error) => console.error(error));
      alert(`Deleted image ${index + 1}!`);
    } else {
      alert(`Invalid index: ${index}`);
    }
  };

  const editForm = () => {
    setReadOnlytext(false);
    setReadEditOnlyCSS("form-control");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => {
      const keys = name.split(".");
      let current = prevValues;
      for (let i = 0; i < keys.length - 1; i++) {
        if (["_id", "id", "name", "images"].includes(keys[i])) {
          continue; // If the key is one of the excluded fields, skip this iteration
        }
        if (isNaN(keys[i + 1])) {
          // If the next key is not a number, treat the current field as an object
          current = current[keys[i]] = { ...(current[keys[i]] || {}) };
        } else {
          // If the next key is a number, treat the current field as an array
          current = current[keys[i]] = [...(current[keys[i]] || [])];
        }
      }
      if (["_id", "id", "name", "images"].includes(keys[keys.length - 1])) {
        return { ...prevValues }; // If the last key is one of the excluded fields, return prevValues without updating
      } else if (isNaN(keys[keys.length - 1])) {
        // If the last key is not a number, update an object field
        current[keys[keys.length - 1]] = value;
      } else {
        // If the last key is a number, update an array element
        current[parseInt(keys[keys.length - 1])] = value;
      }
      return { ...prevValues };
    });
  };

  const renderForm = (data, parentKey = "") => {
    return Object.entries(data).map(([key, value]) => {
      if (["_id", "id", "name", "images"].includes(key)) {
        return null;
      }
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1); // Uppercase the first letter
      if (Array.isArray(value)) {
        return (
          <div className='form-group row' key={key}>
            <h3>{formattedKey}</h3>
            {value.map((item, index) => (
              <div className='form-group row' key={index}>
                <label className='col-sm-2 col-form-label'>
                  {`${index + 1}`}
                </label>
                <div className='col-sm-10'>
                  <input
                    type='text'
                    readOnly={readOnlytext}
                    className={readEditOnlyCSS}
                    name={`${newKey}.${index}`}
                    defaultValue={item}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
          </div>
        );
      } else if (typeof value === "object") {
        return (
          <div className='form-group row' key={key}>
            <h3>{formattedKey}</h3>
            <div className='form-group row'>{renderForm(value, newKey)}</div>
          </div>
        );
      } else {
        return (
          <div className='form-group row' key={key}>
            <label className='col-sm-2 col-form-label'>{formattedKey}</label>
            <div className='col-sm-10'>
              <input
                type='text'
                readOnly={readOnlytext}
                className={readEditOnlyCSS}
                name={newKey}
                defaultValue={value}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setReadOnlytext(true);
    setReadEditOnlyCSS("form-control-plaintext");

    const payload = { ...formValues };
    delete payload._id;
    delete payload.id;
    delete payload.name;
    delete payload.images;

    // updating data to DB
    updateDetails(data.id, payload)
      .then((res) => setdata(res.data))
      .catch((error) => console.error(error));
  };

  return (
    <div className='searchPage'>
      <div className='searchPageImg-Box'>
        {data.images.length > 1 ? (
          <>
            <Carousel interval={null}>
              {data.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className='searchPageImg'
                    src={img}
                    alt={`Slnamee ${index}`}
                  />
                  <div className='trashicondiv'>
                    <Trash
                      color='red'
                      size={31}
                      onClick={() => deleteImage(index)}
                      className='trash-icon'
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
            <FileUpload
              image={data.images}
              id={data.id}
              dat={setupdatedData}
            ></FileUpload>
          </>
        ) : (
          <>
            <img
              className='searchPageImg'
              key={"yes"}
              src={data.images.length == 1 ? data.images : datteimg}
            />
            <FileUpload
              image={data.images}
              id={data.id}
              dat={setupdatedData}
            ></FileUpload>
          </>
        )}
      </div>
      <div className='searchPageText'>
        <h2>
          {data.name}
          <Pencil size={34} onClick={editForm} className='editIcon' />
        </h2>
        <form onSubmit={handleSubmit}>
          {renderForm(formValues)}
          <button className='submit-button' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CharacterDetails;
