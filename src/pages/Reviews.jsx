import ReviewCard from "../components/ReviewCard";
import { useEffect, useState } from "react";
import { fetchReviews } from "../utils/api";
import Loading from "../components/Loading";

const Reviews = ({ categoryName }) => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchReviews(categoryName).then(({ reviews }) => {
      setReviewList(reviews);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Loading />;
  return (
    <section className="main-page">
      <h2 className="page-heading">Reviews</h2>
      <ul className="main-list">
        {reviewList.map((reviewItem) => {
          return (
            <li key={reviewItem.review_id}>
              <ReviewCard review={reviewItem} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Reviews;
