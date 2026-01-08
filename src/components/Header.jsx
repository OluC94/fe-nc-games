import { useContext } from "react";
import { UserContext } from "../contexts/User";

const Header = () => {
  const { username } = useContext(UserContext);
  return (
    <section className="header">
      <h1>NC Games</h1>
      <span>Hi, {username}</span>
    </section>
  );
};

export default Header;
