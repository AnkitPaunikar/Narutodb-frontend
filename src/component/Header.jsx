import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import chibiKakashi from "../assets/chibi.png";
import { getAllSearch } from "../services";
import SuggestionCard from "./SuggestionCard";

const Header = () => {
  const [suggestionsName, setSuggestionsName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const hideOnRoutes = ["/character", "/characterdetails"];

  const handleSearch = (e) => {
    try {
      if (e.length > 0) {
        getAllSearch(e).then((ser) => {
          setSuggestionsName(ser.data);
        });
      }
    } catch (error) {
      console.error(error);
      setSuggestionsName("Invalid search");
    }
  };

  //Search when clicked enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className='header'>
        <div className='header-brand'>
          <a href='/'>
            <img src={chibiKakashi} alt='Logo' />
            NARUTO DB
          </a>
        </div>
        {!hideOnRoutes.includes(location.pathname) && (
          <div className='search-bar'>
            <div className='type-dropdown'>
              <select
                className='type-select'
                name='searchValue'
                id='searchValue'
                onChange={(evt) => handleURL(evt)}
              >
                <option value='character'>Characters</option>
                <option value='clan'>Clans</option>
                <option value='kara'>Kara</option>
                <option value='kekkei-genkai'>Kekkeigenkai</option>
                <option value='tailed-beast'>Tailed Beasts</option>
                <option value='team'>Teams</option>
                <option value='village'>Villages</option>
                <option value='akatsuki'>Akatsuki</option>
              </select>
            </div>

            <div className='searchBox'>
              <input
                id='searchInput'
                type='text'
                placeholder='Search'
                value={inputValue}
                className='searchInput'
                onChange={(e) => {
                  handleSearch(e.target.value);
                  setInputValue(e.target.value);
                }}
                onKeyDown={handleKeyPress}
              />
              <button className='searchButton' onClick={handleSearch}>
                <FaSearch className='search-icon' />
              </button>
            </div>
          </div>
        )}
        {!hideOnRoutes.includes(location.pathname) && suggestionsName && (
          <div className='suggestionCard'>
            {suggestionsName.map((sugg, index) => (
              <SuggestionCard
                key={index}
                suggestionsName={sugg}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
