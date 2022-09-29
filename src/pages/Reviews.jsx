import ReviewCard from "../components/ReviewCard";
import { useEffect, useState } from "react";
import { fetchReviews } from "../utils/api";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { dateFormat } from "../utils/api";

const Reviews = () => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams();
  const [params, setParams] = useState({});

  useEffect(() => {
    setIsLoading(true);
    fetchReviews(params).then(({ reviews }) => {
      setReviewList(reviews);
      setIsLoading(false);
    });
  }, [params]);

  useEffect(() => {
    setParams({ category });
  }, [category]);

  const handleSortBy = (e) => {
    console.log(e.target.value);
    // need to update the url with the queries
    // need to set current view as default
    setParams((currParams) => {
      return { ...currParams, sort_by: e.target.value };
    });
  };

  if (isLoading) return <Loading />;
  return (
    <section className="main-page">
      <section className="dropdown">
        <label htmlFor="sort-by">Sort By:</label>
        <select name="sortBy" id="sort-by" onChange={handleSortBy}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>
      </section>

      <h2 className="page-heading">Reviews</h2>
      <ul className="main-list">
        {reviewList.map((reviewItem) => {
          return (
            <li key={reviewItem.review_id} className="main-card">
              <ReviewCard review={reviewItem} />
              <p>{dateFormat(reviewItem.created_at)}</p>
              <p>
                {reviewItem.comment_count === 1
                  ? reviewItem.comment_count + " comment"
                  : reviewItem.comment_count + " comments"}
              </p>
              <p>
                {reviewItem.votes === 1
                  ? reviewItem.votes + " vote"
                  : reviewItem.votes + " votes"}
              </p>
              <Link to={`/reviews/review/${reviewItem.review_id}`}>
                <button>Read more</button>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Reviews;
