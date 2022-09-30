import { useEffect } from "react";
import { fetchCategories } from "../utils/api";
import { useState } from "react";
import Loading from "../components/Loading";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router-dom";

const Categories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchCategories().then(({ categories }) => {
      setCategoryList(categories);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Loading />;
  return (
    <section className="main-page">
      <h2 className="page-heading">Categories</h2>
      <ul className="main-list">
        {categoryList.map((categoryItem) => {
          return (
            <li key={categoryItem.slug} className="main-card">
              <CategoryCard category={categoryItem} />
              <Link to={`/reviews/${categoryItem.slug}`}>
                <button>See all reviews for {categoryItem.slug} games</button>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Categories;
