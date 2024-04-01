import React from "react";
import { Link } from "react-router-dom";
import "./Userguides.css";

export const UserGuides = [
  {
    id: 1,
    title: "Step 1",
    description: "Search for properties by using the search bar at the top of the page. Enter your desired location, price range, and property type to find properties that meet your criteria."
  },
  {
    id: 2,
    title: "Step 2",
    description: "Browse through the listings to view detailed information about each property, including photos, descriptions, and pricing."
  },
  // Add more guides as needed...
];

const UserGuide = () => {
  return (
    <div className="user-guide-container">
      <Link to="/user-guide">
        <button className="user-guide-button">
          User Guide
        </button>
      </Link>
    </div>
  );
};


export default UserGuide;