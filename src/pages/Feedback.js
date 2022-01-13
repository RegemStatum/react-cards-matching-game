import React from "react";
import { useAppContext } from "../context/app_context";

const Feedback = () => {
  const value = useAppContext();
  return (
    <section className="feedback-page container section-p page-min-height">
      <h1>Feedback page</h1>
    </section>
  );
};

export default Feedback;
