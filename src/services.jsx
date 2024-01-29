import axios from "axios";

export const baseURLNarutoDB = axios.create({
  baseURL: "/narutodb.xyz/api",
});

export const baseURLMongoNarutoDB = axios.create({
  baseURL: "http://localhost:8000",
});

export const getAllCharacter = async (currentPage, limit) => {
  return baseURLNarutoDB.get(
    `https://narutodb.xyz/api/character?page=${currentPage}&limit=${limit}`
  );
};

export const getAllClan = async (currentPage, limit) => {
  return baseURLNarutoDB.get(
    `https://narutodb.xyz/api/clan?page=${currentPage}&limit=${limit}`
  );
};

export const getAllSearch = async (search) => {
  return await baseURLMongoNarutoDB.get(
    `http://localhost:8000/getAll/${search}`
  );
};

export const updateImages = (id, imageUrls) => {
  const updatedData = {
    images: imageUrls,
  };

  return baseURLMongoNarutoDB.patch(
    `http://localhost:8000/update/${id}`,
    updatedData
  );
};

export const updateDetails = (id, updatedData) => {
  return baseURLMongoNarutoDB.patch(
    `http://localhost:8000/updatechardetails/${id}`,
    updatedData
  );
};
