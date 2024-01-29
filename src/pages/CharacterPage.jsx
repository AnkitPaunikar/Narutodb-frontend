import { useEffect, useState } from "react";

import { getAllCharacter } from "../services";

import CharacterCard from "../component/CharacterCard";

const CharacterPage = () => {
  const [characterPerPage, setCharacterPerPage] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  let limit = 12;

  const fetchCharacterData = async (currentPage) => {
    const res = await getAllCharacter(currentPage, limit);
    setCharacterPerPage(res.data.characters);
  };

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    fetchCharacterData(currentPage);
  };

  useEffect(() => {
    const response = getAllCharacter(1, limit);
    response.then((r) => {
      const responseData = r.data.characters;
      const total = r.data.totalCharacters;

      setCharacterPerPage(responseData);
      setpageCount(Math.ceil(total / limit));
    });
  }, [limit]);

  return (
    <>
      <div className='character-page'>
        <CharacterCard
          pageCount={pageCount}
          characterPerPage={characterPerPage}
          handlePageClick={handlePageClick}
        ></CharacterCard>
      </div>
    </>
  );
};

export default CharacterPage;
