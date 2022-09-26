import { useEffect } from "react";
import { fetchCategories } from "../utils/api";
import { useState } from "react";
import Loading from "../components/Loading";
import CategoryCard from "../components/CategoryCard";

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
      <ul className="category-list">
        {categoryList.map((categoryItem) => {
          return (
            <li key={categoryItem.slug}>
              <CategoryCard category={categoryItem} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Categories;
