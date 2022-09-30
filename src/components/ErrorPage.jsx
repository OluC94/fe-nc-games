import { useParams } from "react-router-dom";

const ErrorPage = ({ error }) => {
  const { review_id } = useParams();
  const params = useParams();
  console.log(params["*"]);
  let stsCode;
  if (error !== undefined) {
    stsCode = error.response.status;
  }
  return (
    <section>
      {params["*"] !== undefined ? <p>Sorry, page not found</p> : null}
      {review_id !== undefined && stsCode === 404 ? (
        <p>{stsCode} - Review Not Found</p>
      ) : null}
    </section>
  );
};

export default ErrorPage;
