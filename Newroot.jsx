import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported

const Newroot = () => {
  const [mentorName, setMentorName] = useState(""); // To store mentor's name
  const [classLink, setClassLink] = useState(""); // To store entered class link
  const [message, setMessage] = useState(""); // To display success/error messages

  // Fetch mentor's name on component load
  useEffect(() => {
    axios
      .get("http://localhost:8081/facultyinfo")
      .then((response) => {
        if (response.data.success && response.data.user) {
          const { name } = response.data.user; // Destructure name from the user object
          setMentorName(name || "Mentor"); // Set mentorName
        } else {
          console.error("Unexpected data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching faculty info:", error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classLink) {
      alert("Please enter a class link.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/update-class-link", {
        name: mentorName, 
        link: classLink, 
      });

      if (response.data.success) {
        setMessage("Class link and mentor name updated successfully!");
        setClassLink(""); 
      } else {
        setMessage("Failed to update data. Try again.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setMessage("An error occurred while updating data.");
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

      {/* "Open Skill Share Meet" Button under the submit */}
      <a href="http://localhost:3000/" style={buttonContainerStyle}>
        <button style={buttonUnderSubmitStyle}>Open Skill Share Meet</button>
      </a>

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

const buttonUnderSubmitStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "20px", // Space between submit button and this button
};

const buttonContainerStyle = {
  textAlign: "center", // Center align the button under the submit button
};

const messageStyle = {
  marginTop: "15px",
  fontSize: "14px",
  color: "green",
};

export default Newroot;
