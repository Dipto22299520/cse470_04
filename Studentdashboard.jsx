import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StudentDashboard.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch student information from the backend
    axios
      .get("http://localhost:8081/studentinfo")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setStudentInfo(response.data[0]); // Get the first object in the array
        }
      })
      .catch((error) => {
        console.error("Error fetching student info:", error);
      });
  }, []);

  if (!studentInfo) {
    return <div>Loading student information...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => navigate("/search")} className="sidebar-button">
          Search
        </button>
        <button onClick={() => window.location.href = "http://localhost:5000/"} className="sidebar-button">Sessions</button>
        {/* <button onClick={() => navigate("/rate")} className="sidebar-button">Rate</button> */}
        <button onClick={() => window.location.href = "http://localhost:3002/"} className="sidebar-button">Recordings</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <div className="navbar">
          <button onClick={() => navigate("/classes")} className="navbar-button">Join</button>
          <button className="navbar-button">Quiz</button>
        </div>

        {/* Center Content */}
        <div className="center-content">
          <div className="placeholder-div">
            <h1>Welcome, {studentInfo.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
