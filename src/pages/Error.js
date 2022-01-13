import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components";

const Error = () => {
  return (
    <section className="error-page container center section-p page-min-height">
      <div className="abs-center w-100">
        <h2>404</h2>
        <h3>Sorry, we cant find this page</h3>
        <Link to="/">
          <Button>Back home</Button>
        </Link>
      </div>
    </section>
  );
};

export default Error;
