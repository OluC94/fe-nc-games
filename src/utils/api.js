import axios from "axios";

const gamesAPI = axios.create({
  baseURL: "https://nc-games-oluc94.herokuapp.com/api",
});

export const fetchReviews = (category) => {
  return gamesAPI.get("/reviews", { params: { category } }).then(({ data }) => {
    return data;
  });
};

export const fetchCategories = () => {
  return gamesAPI.get("/categories").then(({ data }) => {
    return data;
  });
};

export const capitalise = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};
