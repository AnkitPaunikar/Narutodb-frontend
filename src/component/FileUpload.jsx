import { useState } from "react";

import { updateImages } from "../services";

const FileUpload = ({ image, id, dat }) => {
  const [uploadedfile, setUploadedfile] = useState([image]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function async() {
      const upfile = reader.result;
      setUploadedfile((prev) => [...prev, upfile]);
    };
  };

  const handleUploadClick = () => {
    if (!uploadedfile) {
      return;
    }
    const combinedArr = [...uploadedfile[0], uploadedfile[1]];
    updateImages(id, combinedArr)
      .then(
        (res) => dat(res.data),
        (document.getElementById("uploadfile").value = "")
      )
      .catch((error) => console.error(error));
  };

  return (
    <div className='upload-file'>
      <input
        id='uploadfile'
        className='upload-input'
        type='file'
        onChange={handleImageUpload}
      />
      <button className='upload-button' onClick={handleUploadClick}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
