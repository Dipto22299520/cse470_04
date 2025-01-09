import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Homepage.css";
import "./Welcome.css";

const About_the_company = () => {
  const [mentorsData, setMentorsData] = useState([]); // For mentor data
  const [courseData, setCourseData] = useState([]); // For course-specific data
  const [error, setError] = useState(null); // For error handling
  const [selectedCourse, setSelectedCourse] = useState(null); // Currently selected course

  // Fetch top mentors data
  useEffect(() => {
    console.log("Fetching mentors...");
    fetch("http://localhost:8081/notify")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch mentor data");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched mentor data:", data);
        setMentorsData(data);
      })
      .catch((err) => {
        console.error("Mentor fetch error:", err.message);
        setError("Failed to load mentor information.");
      });
  }, []);

  // Fetch data based on selected course
  useEffect(() => {
    if (selectedCourse) {
      const fetchCourseData = async () => {
        try {
          const response = await axios.post("http://localhost:8081/finder", {
            courseName: selectedCourse,
          });
          console.log("Fetched course data:", response.data);
          setCourseData(response.data);
        } catch (err) {
          console.error("Course fetch error:", err);
          setError("Failed to load course information.");
        }
      };
      fetchCourseData();
    }
  }, [selectedCourse]);

  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
    setError(null); // Clear previous errors
  };

  return (
    <div>
      {/* Mentor Section */}
      <h1 className="section-title">Top Mentors</h1>
      <div className="mentors-container">
        {error ? (
          <p className="error-message">{error}</p>
        ) : mentorsData.length > 0 ? (
          mentorsData.map((mentor) => (
            <div
              key={mentor.id || Math.random()}
              className="mentor-card"
              onClick={() => console.log(`Clicked on mentor: ${mentor.name || "Unknown"}`)}
            >
              {mentor.image_path && (
                <img
                  src={mentor.image_path}
                  alt={`${mentor.name || "No Name"}'s profile`}
                  className="mentor-image"
                />
              )}
              <h3>{mentor.name || "No Name"}</h3>
              <p>Expertise: {mentor.selling_line || "N/A"}</p>
              <p>Rating: {mentor.rating || "N/A"}</p>
              <p>Price: ${mentor.price || "N/A"}</p>
            </div>
          ))
        ) : (
          <p>No mentors available.</p>
        )}
      </div>

      {/* Course Section */}
      <h1 className="section-title">Recomended</h1>
      <div className="course-buttons">
        <button className="view-button" onClick={() => handleCourseSelection("programming")}>Programming</button>
        <button className="view-button" onClick={() => handleCourseSelection("web_development")}>Web Development</button>
        <button className="view-button" onClick={() => handleCourseSelection("database_management")}>Database Management</button>
        <button className="view-button" onClick={() => handleCourseSelection("cloud_computing")}>Cloud Computing</button>
        <button className="view-button" onClick={() => handleCourseSelection("cybersecurity")}>Cybersecurity</button>
        <button className="view-button" onClick={() => handleCourseSelection("data_science_and_analytics")}>Data Science and Analytics</button>
        <button className="view-button" onClick={() => handleCourseSelection("artificial_intelligence_and_machine_learning")}>AI and ML</button>
        <button className="view-button" onClick={() => handleCourseSelection("version_control_and_collaboration")}>Version Control and Collaboration</button>
      </div>

      <div className="mentors-container">
        {error ? (
          <p className="error-message">{error}</p>
        ) : courseData.length > 0 ? (
          courseData.map((mentor) => (
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
          <p></p>
        )}
      </div>
    </div>
  );
};

export default About_the_company;
