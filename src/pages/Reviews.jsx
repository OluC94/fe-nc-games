import ReviewCard from "../components/ReviewCard";
import { useEffect, useState } from "react";
import { fetchReviews } from "../utils/api";

const Reviews = () => {
  const [reviewList, setReviewList] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchReviews().then(({ reviews }) => {
      setReviewList(reviews);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  return (
    <section className="main-page">
      <h2>Reviews</h2>
      <ul className="review-list">
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
