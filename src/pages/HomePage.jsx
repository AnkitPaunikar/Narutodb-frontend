import { useNavigate } from "react-router-dom";

import homeGif from "../assets/T.gif";

function HomePage() {
  const navigate = useNavigate();

  function characterPageRedirect() {
    navigate("/character");
  }

  function clanPageRedirect() {
    navigate("/clan");
  }

  return (
    <>
      <div className='homePage-gif'>
        <img src={homeGif} width={300} height={200}></img>
      </div>
      <div className='homePage-container'>
        <div className='button-spacing'>
          <button
            className='btn homePage-button'
            onClick={characterPageRedirect}
          >
            Characters
          </button>
        </div>

        <div className='button-spacing'>
          <button className='btn homePage-button' onClick={clanPageRedirect}>
            Clans
          </button>
        </div>
        <div className='button-spacing'>
          <button
            className='btn homePage-button'
            onClick={characterPageRedirect}
          >
            Kara
          </button>
        </div>
        <div className='button-spacing'>
          <button
            className='btn homePage-button'
            onClick={characterPageRedirect}
          >
            Kekkeigenkai
          </button>
        </div>
        <div className='button-spacing'>
          <button
            className='btn homePage-button'
            onClick={characterPageRedirect}
          >
            Tailed Beasts
          </button>
        </div>
        <div className='button-spacing'>
          <button
            className='btn homePage-button'
            onClick={characterPageRedirect}
          >
            Teams
          </button>
        </div>
        <div className='button-spacing'>
          <button
            className='btn homePage-button'
            onClick={characterPageRedirect}
          >
            Villages
          </button>
        </div>
        <div className='button-spacing'>
          <button
            className='btn homePage-button'
            onClick={characterPageRedirect}
          >
            Akatsuki
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
