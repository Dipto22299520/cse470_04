import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Homepage.css";
import "./Welcome.css"
const Courseinfo = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [courseName, setCourseName] = useState(null); // No default course

  // Function to handle course button click
  const handleCourseChange = (course) => {
    setCourseName(course); // Set selected course
  };

  // Fetch data based on the selected course
  useEffect(() => {
    if (courseName) {
      const fetchData = async () => {
        try {
          const response = await axios.post("http://localhost:8081/finder", {
            courseName: courseName, // Send the selected course
          });
          console.log("Course data fetched:", response.data);
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to load course information.");
        }
      };

      fetchData();
    }
  }, [courseName]); // Trigger fetch when courseName changes

  return (
    <div>
      <h1 className="course-title">Course Information</h1>

      {/* Buttons to select courses */}
      <div className="hoverer">
        <button className="view-button" onClick={() => handleCourseChange("programming")}>Programming</button>
        <button className="view-button" onClick={() => handleCourseChange("web_development")}>Web Development</button>
        <button className="view-button" onClick={() => handleCourseChange("database_management")}>Database Management</button>
        <button className="view-button" onClick={() => handleCourseChange("cloud_computing")}>Cloud Computing</button>
        <button className="view-button" onClick={() => handleCourseChange("cybersecurity")}>Cybersecurity</button>
        <button className="view-button" onClick={() => handleCourseChange("data_science_and_analytics")}>
          Data Science and Analytics
        </button>
        <button className="view-button" onClick={() => handleCourseChange("artificial_intelligence_and_machine_learning")}>
          AI and ML
        </button>
        <button className="view-button" onClick={() => handleCourseChange("version_control_and_collaboration")}>
          Version Control and Collaboration
        </button>
      </div>

      <div className="mentors-container">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          data.length > 0 ? (
            data.map((mentor) => (
              <div
                key={mentor.id}
                className="mentor-card"
                onClick={() => console.log(`Clicked on mentor: ${mentor.name}`)}
              >
                {mentor.image_path && (
                  <img
                    src={mentor.image_path}
                    alt={`${mentor.name}'s profile`}
                    className="mentor-image"
                  />
                )}
                <h3>{mentor.name}</h3>
                <p>Expertise: {mentor.selling_line}</p>
                <p>Rating: {mentor.rating}</p>
                <p>Price: ${mentor.price}</p>
              </div>
            ))
          ) : (
            <p>No mentors available.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Courseinfo;
