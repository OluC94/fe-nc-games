import "./App.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";
import { useState } from "react";
import Categories from "./pages/Categories";

function App() {
  const [username, setUser] = useState("mallionaire");
  const [categoryName, setCategoryName] = useState("");
  return (
    <div className="App">
      <Header username={username} />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/reviews"
          element={<Reviews categoryName={categoryName} />}
        />
        <Route
          path="/categories"
          element={<Categories setCategoryName={setCategoryName} />}
        />
      </Routes>
    </div>
  );
}

export default App;
