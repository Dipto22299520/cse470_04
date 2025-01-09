import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/Yahoo"); // Navigate to Homepage.jsx
  };

  return (
    <div className="welcome-container">
      <div className="welcome-text">
        Welcome to <span className="highlight">Skillshare</span>!
      </div>
      <p className="welcome-subtext">Explore and learn new skills today.</p>
      <button className="view-button" onClick={handleButtonClick}>
        Unlock you full potential with us
      </button>
    </div>
  );
};

export default WelcomePage;

