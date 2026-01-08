import ReviewCard from "../components/ReviewCard";
import { useEffect, useState } from "react";
import { fetchReviews } from "../utils/api";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { dateFormat } from "../utils/api";
import { useSearchParams } from "react-router-dom";

const Reviews = () => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [badCategory, setBadCategory] = useState(false);
  const { category } = useParams();
  const [params, setParams] = useState({});
  const [searchParams, setSearchParams] = useSearchParams({});

  const queryOutput = {
    created_at: "date",
    comment_count: "comment count",
    votes: "votes",
    asc: "ascending",
    desc: "descending",
  };

  useEffect(() => {
    setIsLoading(true);
    setBadCategory(false);
    fetchReviews(params)
      .then(({ reviews }) => {
        setReviewList(reviews);
        setIsLoading(false);
      })
      .catch((err) => {
        setBadCategory(true);
        setIsLoading(false);
      });
  }, [params, searchParams]);

  useEffect(() => {
    setParams({
      category,
      sort_by: searchParams.get("sort_by"),
      order: searchParams.get("order"),
    });

    // remove this disable when refactoring
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleSortBy = (e) => {
    setSearchParams({ sort_by: e.target.value });

    setParams((currParams) => {
      return { sort_by: e.target.value };
    });
  };

  const handleOrder = (e) => {
    setSearchParams((currSearchParams) => {
      if (params.sort_by === undefined)
        return { sort_by: "created_at", order: e.target.value };
      return { sort_by: params.sort_by, order: e.target.value };
    });
    setParams((currParams) => {
      return { ...currParams, order: e.target.value };
    });
  };

  if (isLoading) return <Loading />;
  return (
    <section className="main-page">
      <h2 className="page-heading">Reviews</h2>
      {badCategory ? <p>Category not found</p> : null}
      <section>
        <label htmlFor="sort-by">Sort By:</label>
        <select
          name="sortBy"
          className="dropdown"
          id="sort-by"
          onChange={handleSortBy}
        >
          <option>...</option>
          <option value="created_at">Date</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>
        {params.sort_by === undefined || params.sort_by === null ? (
          <span>Currently sorting: date</span>
        ) : (
          <span>
            Currently sorting:{" "}
            {queryOutput[params.sort_by] || "criteria not recognised"}
          </span>
        )}

        <br />
        <label htmlFor="order">Order By:</label>
        <select
          name="order"
          className="dropdown"
          id="order"
          onChange={handleOrder}
        >
          <option>...</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        {params.order === undefined || params.order === null ? (
          <span>Current order: descending</span>
        ) : (
          <span>
            Current order: {queryOutput[params.order] || "order not recognised"}
          </span>
        )}
        <br />
      </section>
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
