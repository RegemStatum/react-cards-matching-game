import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import Button from "../components/Button";

const Feedback = () => {
  const [state, handleSubmit] = useForm("mdobakzb");
  if (state.succeeded) {
    return (
      <section className="feedback-page container section-p page-min-height">
        <h3>Thanks for your feedback!</h3>
      </section>
    );
  }

  return (
    <section className="feedback-page container section-p page-min-height">
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="name" className="sb">
            Name
          </label>
          <input type="text" name="name" id="name" required />
          <ValidationError
            prefix="Message"
            field="name"
            errors={state.errors}
          />
        </div>
        <div className="form-input">
          <label htmlFor="email" className="sb">
            Email
          </label>
          <input type="email" name="email" id="email" required />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
        <div className="form-input">
          <label htmlFor="feedback" className="sb">
            Feedback
          </label>
          <textarea name="feedback" id="feedback" required></textarea>
          <ValidationError
            prefix="Message"
            field="feedback"
            errors={state.errors}
          />
        </div>
        <Button className="w-100">Submit</Button>
      </form>
    </section>
  );
};

export default Feedback;
