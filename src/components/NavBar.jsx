import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <section className="nav">
      <Link to="/" className="nav-item">
        Home
      </Link>
      <Link to="/categories" className="nav-item">
        Categories
      </Link>
      <Link to="/reviews" className="nav-item">
        Reviews
      </Link>
      <Link to="/users" className="nav-item">
        Users
      </Link>
    </section>
  );
};

export default NavBar;
