import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import datteimg from "../assets/dattebayo.jpg";

const SuggestionCard = ({ suggestionsName, index }) => {
  const navigate = useNavigate();
  return (
    <>
      {suggestionsName && (
        <>
          <div>
            <div className='mb-3 homepage-card'>
              <div className='row g-0'>
                <div className='col-md-4'>
                  {suggestionsName.images.length > 1 ? (
                    <Carousel>
                      {suggestionsName.images.map((img, index) => (
                        <Carousel.Item key={index}>
                          <img
                            className='card-img-top homepage-card-image'
                            src={img}
                            alt={`Slide ${index}`}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <img
                      key={index}
                      className='card-img-top homepage-card-image'
                      src={
                        suggestionsName.images.length == 1
                          ? suggestionsName.images
                          : datteimg
                      }
                      alt={suggestionsName.name}
                    />
                  )}
                </div>
                <div className='col-md-8'>
                  <div className='card-body'>
                    <h6 className='card-title'>{suggestionsName.name}</h6>
                  </div>

                  <button
                    className='home-page-viewmorebtn'
                    onClick={() => {
                      navigate("/characterdetails", {
                        state: { data: suggestionsName },
                      });
                    }}
                  >
                    <p className='btnText'>View Details</p>
                    <div className='btnTwo'>
                      <p className='btnText2'>GO!</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {suggestionsName == "Invalid search" && (
        <div className='homepage-card-error'>
          <p>Invalid search</p>
        </div>
      )}
    </>
  );
};

export default SuggestionCard;
