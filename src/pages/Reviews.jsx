import ReviewCard from "../components/ReviewCard";
import { useEffect, useState } from "react";
import { fetchReviews } from "../utils/api";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Reviews = () => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { category } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchReviews(category).then(({ reviews }) => {
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
            <li key={reviewItem.review_id} className="main-card">
              <ReviewCard review={reviewItem} />
              <Link
                to={`/reviews/${reviewItem.category}/${reviewItem.review_id}`}
              >
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
