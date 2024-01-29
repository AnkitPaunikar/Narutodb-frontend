import { useEffect, useState } from "react";

import { getAllClan } from "../services";

import CharacterCard from "../component/CharacterCard";

const ClanPage = () => {
  const [characterPerPage, setCharacterPerPage] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  let limit = 12;

  const fetchCharacterData = async (currentPage) => {
    const res = await getAllClan(currentPage, limit);
    setCharacterPerPage(res.data.clans);
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    fetchCharacterData(currentPage);
  };

  useEffect(() => {
    const response = getAllClan(1, limit);
    response.then((r) => {
      const responseData = r.data.clans;
      const total = r.data.totalClans;

      setCharacterPerPage(responseData);
      setpageCount(Math.ceil(total / limit));
    });
  }, [limit]);

  return (
    <>
      <div>clan</div>
      {/* <CharacterCard
        pageCount={pageCount}
        characterPerPage={characterPerPage}
        handlePageClick={handlePageClick}
      ></CharacterCard> */}
    </>
  );
};

export default ClanPage;
