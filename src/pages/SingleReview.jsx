import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import Loading from "../components/Loading";
import ReviewCard from "../components/ReviewCard";
import { dateFormat, fetchSingleReview, incVotes } from "../utils/api";

const SingleReview = () => {
  const { category, review_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [displayReview, setDisplayReview] = useState({});
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchSingleReview(review_id)
      .then(({ review }) => {
        setDisplayReview(review);
        setVotes(review.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [review_id]);

  const handleVote = (review) => {
    if (!hasVoted) {
      setVotes((currVotes) => currVotes + 1);
      setHasVoted(!hasVoted);
      incVotes(review.review_id, { inc_votes: 1 }).catch((err) => {
        setVotes((currVotes) => currVotes - 1);
      });
    } else {
      setVotes((currVotes) => currVotes - 1);
      setHasVoted(!hasVoted);
      incVotes(review.review_id, { inc_votes: -1 }).catch((err) => {
        setVotes((currVotes) => currVotes + 1);
      });
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage error={error} />;
  return (
    <section className="main-page">
      <ReviewCard review={displayReview} />
      <p>{votes === 1 ? votes + " vote" : votes + " votes"} </p>
      <button onClick={() => handleVote(displayReview)}>Vote!</button>
      <p>{displayReview.review_body}</p>
      <p>{dateFormat(displayReview.created_at)}</p>
    </section>
  );
};

export default SingleReview;
