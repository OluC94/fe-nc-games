import { capitalise } from "../utils/api";

const CategoryCard = ({ category }) => {
  return (
    <section>
      <h3>{capitalise(category.slug)}</h3>
      <p>{category.description}</p>
    </section>
  );
};

export default CategoryCard;
