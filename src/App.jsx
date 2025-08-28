import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import Header from "./components/Header";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFound.jsx";

import "./scss/app.scss";

const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home searchValue={searchValue} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
