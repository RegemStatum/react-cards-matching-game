import React from "react";
// react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// header & footer
import { Header, Footer } from "./components";
// pages
import { Home, Error } from "./pages";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
