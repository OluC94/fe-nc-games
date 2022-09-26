const Header = ({ username }) => {
  return (
    <section className="header">
      <h1>NC Games</h1>
      <span>Hi, {username}</span>
    </section>
  );
};

export default Header;
