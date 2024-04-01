import React from "react";
import { Link } from "react-router-dom";
import "./ContacTINFO.css";

const ContacTINFO = () => {
  return (
    <div className="container">
      <Link to="/contact-info" className="ci contact-link">
        <button className="contact-button">Contact Information</button>
      </Link>
    </div>
  );
};


export default ContacTINFO;
