import React, { useState, useEffect } from "react";
import axios from "axios";

const Facultydashboard = () => {
  const [mentorName, setMentorName] = useState(""); // To store mentor's name
  const [classLink, setClassLink] = useState(""); // To store entered class link
  const [message, setMessage] = useState(""); // To display success/error messages

  // Fetch mentor's name on component load
  useEffect(() => {
    const fetchMentorName = async () => {
      try {
        const mentorId = localStorage.getItem("userId"); // Assuming user ID is stored in localStorage
        const response = await axios.get("http://localhost:8081/get-mentor-info", {
          params: { userId: mentorId },
        });

        if (response.data.success) {
          setMentorName(response.data.name);
        } else {
          setMessage("Failed to fetch mentor information.");
        }
      } catch (error) {
        console.error("Error fetching mentor info:", error);
        setMessage("An error occurred while fetching mentor information.");
      }
    };

    fetchMentorName();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classLink) {
      alert("Please enter a class link.");
      return;
    }

    try {
      const mentorId = localStorage.getItem("userId");
      const response = await axios.post("http://localhost:8081/update-class-link", {
        userId: mentorId,
        link: classLink,
      });

      if (response.data.success) {
        setMessage("Class link updated successfully!");
        setClassLink(""); // Clear the input field
      } else {
        setMessage("Failed to update class link. Try again.");
      }
    } catch (error) {
      console.error("Error updating class link:", error);
      setMessage("An error occurred while updating class link.");
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Welcome {mentorName}</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="classLink" style={labelStyle}>
          Enter Class Link:
        </label>
        <input
          type="text"
          id="classLink"
          value={classLink}
          onChange={(e) => setClassLink(e.target.value)}
          placeholder="Enter class link"
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

// Styles
const containerStyle = {
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const formStyle = {
  marginTop: "20px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const messageStyle = {
  marginTop: "15px",
  fontSize: "14px",
  color: "green",
};

export default FacultyDashboard2;
