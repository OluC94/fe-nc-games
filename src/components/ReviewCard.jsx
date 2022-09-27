import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  return (
    <section>
      <h3>{review.title}</h3>
      <p>Category: {review.category}</p>
      <p>Author: {review.owner}</p>
      <img
        src={review.review_img_url}
        alt="alt text here"
        className="review-img"
      />
      <br></br>
      <p>
        {review.comment_count === 1
          ? review.comment_count + " comment"
          : review.comment_count + " comments"}
      </p>
    </section>
  );
};

export default ReviewCard;
