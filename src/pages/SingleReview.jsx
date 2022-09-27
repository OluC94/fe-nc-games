import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ReviewCard from "../components/ReviewCard";
import { dateFormat, fetchSingleReview } from "../utils/api";

const SingleReview = () => {
  const { category, review_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [displayReview, setDisplayReview] = useState({});

  useEffect(() => {
    setIsLoading(true);
    fetchSingleReview(review_id).then(({ review }) => {
      setDisplayReview(review);
      setIsLoading(false);
    });
  }, [review_id]);

  if (isLoading) return <Loading />;
  return (
    <section className="main-page">
      <ReviewCard review={displayReview} />
      <p>{displayReview.review_body}</p>
      <p>{dateFormat(displayReview.created_at)}</p>
    </section>
  );
};

export default SingleReview;
