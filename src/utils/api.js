import axios from "axios";

export const capitalise = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const dateFormat = (date) => {
  if (date === "Just added") return date;

  const dateArray = date.split("T");
  const timeArray = dateArray[1].split("Z");
  return `Added on ${dateArray[0]} at ${timeArray[0].slice(0, 5)}`;
};

const gamesAPI = axios.create({
  baseURL: "https://nc-games-oluc94.herokuapp.com/api",
});

export const fetchReviews = (params) => {
  console.log(params);
  return gamesAPI.get("/reviews", { params }).then(({ data }) => {
    return data;
  });
};

export const fetchSingleReview = (review_id) => {
  return gamesAPI.get(`/reviews/${review_id}`).then(({ data }) => {
    return data;
  });
};

export const incVotes = (review_id, data) => {
  return gamesAPI.patch(`/reviews/${review_id}`, data).then(({ data }) => {
    return data;
  });
};

export const fetchReviewComments = (review_id) => {
  return gamesAPI.get(`/reviews/${review_id}/comments`).then(({ data }) => {
    return data;
  });
};

export const addReviewComment = (review_id, data) => {
  return gamesAPI
    .post(`/reviews/${review_id}/comments`, data)
    .then(({ data }) => {
      return data;
    });
};

export const fetchCategories = () => {
  return gamesAPI.get("/categories").then(({ data }) => {
    return data;
  });
};
