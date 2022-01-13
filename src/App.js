import React from "react";
// react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// header & footer
import { Header, Footer } from "./components";
import { AppProvider } from "./context/app_context";
// pages
import { Home, Error, Feedback, Login } from "./pages";

function App() {
  return (
    <AppProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/feedback" element={<Feedback />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
        <Footer />
      </Router>
    </AppProvider>
  );
}

export default App;
