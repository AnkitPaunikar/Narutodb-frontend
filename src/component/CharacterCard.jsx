import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Pagination from "../component/Pagination";
import datteimg from "../assets/dattebayo.jpg";

const characterPerPage = ({ pageCount, characterPerPage, handlePageClick }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className='container'>
        <div className='row row-cols-1 row-cols-md-4 g-5'>
          {characterPerPage.map((Details, index) => (
            <div className='col-3'>
              <div className='p-1'>
                <div className='card' key={Details.id}>
                  {Details.images.length > 1 ? (
                    <Carousel>
                      {Details.images.map((img, index) => (
                        <Carousel.Item key={index}>
                          <img
                            className='card-img-top'
                            src={img}
                            alt={`Slide ${index}`}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <img
                      key={index}
                      className='card-img-top '
                      src={
                        Details.images.length == 1 ? Details.images : datteimg
                      }
                    />
                  )}

                  <div className='card-body'>
                    <h5 className='card-title'>{Details.name}</h5>
                    <button
                      className='home-page-viewmorebtn'
                      onClick={() => {
                        navigate("/characterdetails", {
                          state: { data: Details },
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
          ))}
        </div>
      </div>
      <div>
        <Pagination
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        ></Pagination>
      </div>
    </>
  );
};

export default characterPerPage;
