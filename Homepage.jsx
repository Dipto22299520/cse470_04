import React, { useEffect, useState } from "react";
import ImageSlider from "./Imageslider.js";
import "./Homepage.css";
import Courses from "./Courses.js";
import axios from "axios";

const Homepage = () => {
  const slides = [
    { url: "/images/g1.jpg" },
    { url: "/images/usefull2.jpg" },
  ];

  const [data, setData] = useState([]);

  // Fetch top mentors
  useEffect(() => {
    fetch('http://localhost:8081/')
      .then(res => res.json())
      .then(data => setData(data)) // data is an array of arrays
      .catch(err => console.log(err));
  }, []);

  // Flatten the results (if they are nested arrays)
  const flattenedData = data.flat();

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
          <div className="searchbar">
            <input type="text" placeholder="Search anything..." />
          </div>
          <div className="right-side">
            <a href="./about_the_company" className="text">
              <div className="opening">Login</div>
            </a>
            <a href="./about_the_company" className="text">
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
        <Courses />
      </div>
      <div className="text2">Our best seller courses</div>
      <div className="text2">Top Mentors</div>
      {/* Top Mentors Section */}
      <div className="top-mentors">
        
        <div className="top-mentors-container">
          {data.length > 0 ? (
            flattenedData.map((mentor) => (
              <button key={mentor.id} className="mentor-card" onClick={() => console.log(`Clicked on mentor: ${mentor.name}`)} >
                {mentor.image_path && (
                  <img 
                    src={mentor.image_path}  
                    className="mentor-image"
                  />
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

export default Homepage;
