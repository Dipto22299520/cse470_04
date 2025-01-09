import React, { useEffect, useState, useRef } from "react";
import ImageSlider from "./Imageslider.js";
import "./Homepage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Yahoo = () => {
  const slides = [
    { url: "/images/g1.jpg" },
    { url: "/images/usefull2.jpg" },
  ];

  const [data, setData] = useState([]); // For top mentors data
  const coursesListRef = useRef(null); // For scrolling courses
  const [activeButton, setActiveButton] = useState(null); // Track active course button
  const navigate = useNavigate();

  // Fetch top mentors
  useEffect(() => {
    fetch("http://localhost:8081/")
      .then((res) => res.json())
      .then((data) => setData(data)) // data is an array of arrays
      .catch((err) => console.log(err));
  }, []);

  const flattenedData = Array.isArray(data[0]) ? data.flat() : data;

  const courses = [
    "Programming",
    "Web Development",
    "Database Management",
    "Cloud Computing",
    "Cybersecurity",
    "Data Science and Analytics",
    "Artificial Intelligence and Machine Learning",
    "Version Control and Collaboration",
  ];

  const scrollLeft = () => {
    if (coursesListRef.current) {
      coursesListRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (coursesListRef.current) {
      coursesListRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const handleButtonClick = async (index) => {
    let selectedCourse = courses[index].toLowerCase().replace(/ /g, "_");
    console.log("Sending courseName:", selectedCourse);

    try {
      const response = await axios.post("http://localhost:8081/finder", {
        courseName: selectedCourse,
      });
      console.log("Response from server:", response);
      navigate("/About_the_company");
    } catch (error) {
      console.error("Error sending course data to the backend:", error);
      alert("There was an error processing your request.");
    }
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <div className="navbar">
        <div className="opening">
          <a href="./Homepage" className="opening">
            Skillshare
          </a>
        </div>
        <a href="./about_the_company" className="text">
          <div className="opening">About Us</div>
        </a>
        <div className="searchbar-container">
          <div className="right-side">
            <a href="./LoginOptions" className="text">
              <div className="opening">Login</div>
            </a>
            <a href="./Home" className="text">
              <div className="opening">Sign-up</div>
            </a>
            <a href="./about_the_company" className="text">
              <div className="opening">Teach on Skillshare</div>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="picture_provider">
        <ImageSlider slides={slides} />
      </div>
      <div className="main_text">All the skills you need in one place</div>
      <div className="text1">
        From critical skills to technical topics, Skill Share supports your professional development.
      </div>

      {/* Courses Section */}
      <div className="courses">
        <div className="courses-container">
          <button className="arrow-button left-arrow" onClick={scrollLeft}>
            ❮
          </button>
          <div className="courses-list" ref={coursesListRef}>
            {courses.map((course, index) => (
              <button
                key={index}
                className={`course-button ${activeButton === index ? "active" : ""}`}
                onClick={() => {
                  setActiveButton(index);
                  handleButtonClick(index);
                }}
              >
                {course}
              </button>
            ))}
          </div>
          <button className="arrow-button right-arrow" onClick={scrollRight}>
            ❯
          </button>
        </div>
      </div>

      <div className="text2">Our best seller courses</div>
      <div className="text2">Top Mentors</div>

      {/* Top Mentors Section */}
      <div className="top-mentors">
        <div className="top-mentors-container">
          {data.length > 0 ? (
            flattenedData.map((mentor) => (
              <button
                key={mentor.id}
                className="mentor-card"
                onClick={() => console.log(`Clicked on mentor: ${mentor.name}`)}
              >
                {mentor.image_path && (
                  <img src={mentor.image_path} className="mentor-image" />
                )}
                <h3>{mentor.name}</h3>
                <p>Expertise: {mentor.selling_line}</p>
                <p>Rating: {mentor.rating}</p>
                <p>Price: ${mentor.price}</p>
              </button>
            ))
          ) : (
            <p>No mentors available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Yahoo;
