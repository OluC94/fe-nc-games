import axios from "axios";

const gamesAPI = axios.create({
  baseURL: "https://nc-games-oluc94.herokuapp.com/api",
});

export const fetchReviews = () => {
  return gamesAPI.get("/reviews").then(({ data }) => {
    return data;
  });
};

export const fetchCategories = () => {
  return gamesAPI.get("/categories").then(({ data }) => {
    return data;
  });
};
