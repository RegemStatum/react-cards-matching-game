import React from "react";

const Footer = () => {
  return (
    <footer className="footer container center">
      <div>
        <div className="row al-c jus-c">
          <p className="b">Made by </p>
          <a href="https://github.com/RegemStatum">
            <h4 className="accent text-sh">Al_Kon</h4>
          </a>
        </div>
        <p className="sb copy">&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
