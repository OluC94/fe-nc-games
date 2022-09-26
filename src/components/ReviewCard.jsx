const ReviewCard = () => {
  const tempReview = {
    review_id: 4,
    title: "One Night Ultimate Werewolf",
    category: "hidden-roles",
    designer: "Akihisa Okui",
    owner: "happyamy2016",
    review_body: "We couldn't find the werewolf!",
    review_img_url:
      "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    created_at: "2021-01-18T10:01:41.251Z",
    votes: 5,
    comment_count: 4,
  };

  return (
    <section className="review-card">
      <h2>{tempReview.title}</h2>
      <p>Category: {tempReview.category}</p>
      <p>Author: {tempReview.owner}</p>
      <img
        src={tempReview.review_img_url}
        alt="alt text here"
        className="review-img"
      />
      <p>
        {tempReview.votes === 1
          ? tempReview.votes + " vote"
          : tempReview.votes + " votes"}{" "}
      </p>
      <p>
        {tempReview.comment_count === 1
          ? tempReview.comment_count + " comment"
          : tempReview.comment_count + " comments"}
      </p>
    </section>
  );
};

export default ReviewCard;
