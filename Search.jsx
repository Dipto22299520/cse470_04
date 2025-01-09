import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css"; // Import the CSS file
import "./Homepage.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleEnroll = (mentor) => {
      navigate("/payment", { state: { mentor } }); // Navigate to Payment page with mentor details
    };
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

  // State for handling the input values
  const [selectedCourse, setSelectedCourse] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState(100); // Default price range
  const [data, setData] = useState([]); // State to hold fetched mentors data
  const [loading, setLoading] = useState(false); // Loading state

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleRatingChange = (e) => {
    // Ensure minRating is treated as a number
    setMinRating(Number(e.target.value));
  };

  const handlePriceChange = (e) => {
    // Ensure priceRange is treated as a number
    setPriceRange(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Convert course name as per the requirement
    const courseName = selectedCourse.toLowerCase().replace(/ /g, "_");
  
    // Prepare the data to be sent to the backend
    const requestData = {
      courseName,
      minRating,
      priceRange,
    };
  
    setLoading(true); // Set loading to true when a search is initiated
  
    // Send the data to the backend
    axios
      .post("http://localhost:8081/finder2", requestData)
      .then((response) => {
        console.log("Mentors found:", response.data);
  
        // Check if the response is null or empty
        if (!response.data || response.data.length === 0) {
          setData([]); // Set data to an empty array
        } else {
          setData(response.data); // Update data state with the fetched mentors
        }
      })
      .catch((error) => {
        console.error("Error fetching mentors:", error);
        setData([]); // Set data to an empty array in case of error
      })
      .finally(() => {
        setLoading(false); // Set loading to false once the request is complete
      });
  };
  
  return (
    <div className="search-container">
      <h1>Search Courses</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="course">Select Course:</label>
          <select
            id="course"
            value={selectedCourse}
            onChange={handleCourseChange}
            className="form-input"
          >
            <option value="">--Select a course--</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="min-rating">Minimum Rating:</label>
          <input
            type="number"
            id="min-rating"
            value={minRating}
            onChange={handleRatingChange}
            min="0"
            max="5"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price-range">Price Range: ${priceRange}</label>
          <input
            type="range"
            id="price-range"
            value={priceRange}
            onChange={handlePriceChange}
            min="0"
            max="3000"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="submit-button">
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <p>Loading mentors...</p>
      ) : (
<div className="top-mentors">
  <div className="top-mentors-container">
    {loading ? (
      <p>Loading mentors...</p>
    ) : data.length > 0 ? (
      data.map((mentor) => (
        <div key={mentor.id} className="mentor-card-container">
          <div className="mentor-card">
            {mentor.image_path && (
              <img src={mentor.image_path} className="mentor-image" alt={mentor.name} />
            )}
            <div className="mentor-details">
              <h3>{mentor.name}</h3>
              <p>Expertise: {mentor.selling_line}</p>
              <p>Rating: {mentor.rating}</p>
              <p>Price: ${mentor.price}</p>
            </div>
          </div>
          <button
                className="enroll-button"
                onClick={() => handleEnroll(mentor)} // Call handleEnroll with mentor details
              >
                Enroll
              </button>
        </div>
      ))
    ) : (
      <p>No course available at this price.</p>
    )}
  </div>
</div>


      )}
    </div>
  );
};

export default Search;
