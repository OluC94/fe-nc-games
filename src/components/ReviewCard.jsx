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
    </section>
  );
};

export default ReviewCard;
