import React, { useRef } from "react";
import "./AboutUs.css";

const AboutUs = () => {
  const aboutUsSectionRef = useRef(null);

  const scrollToAboutUsSection = () => {
    if (aboutUsSectionRef.current) {
      aboutUsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button className="about-us1" onClick={scrollToAboutUsSection}>
      About Us
    </button>
  );
};

export default AboutUs;