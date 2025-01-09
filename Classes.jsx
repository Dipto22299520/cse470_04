import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Classes = () => {
  const [classLinks, setClassLinks] = useState([]); // To store fetched class links
  const [message, setMessage] = useState(""); // For success/error messages

  useEffect(() => {
    const fetchClassLinks = async () => {
      try {
        // Step 1: Fetch logged-in student's info
        const studentResponse = await axios.get("http://localhost:8081/studentinfo");
        const studentData = studentResponse.data;

        if (Array.isArray(studentData) && studentData.length > 0) {
          const studentEmail = studentData[0].email; // Extract email from student data

          // Step 2: Send email to backend to fetch class links
          const mentorResponse = await axios.post("http://localhost:8081/get-class-links", {
            email: studentEmail,
          });

          if (mentorResponse.data.success && mentorResponse.data.linksWithMentor) {
            // Ensure each link item has a mentorName
            setClassLinks(mentorResponse.data.linksWithMentor);
          } else {
            setMessage("No class links found for the logged-in student.");
          }
        } else {
          setMessage("Failed to fetch student info.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("An error occurred while fetching class links.");
      }
    };

    fetchClassLinks();
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Class Links</h1>
      {message && <p style={messageStyle}>{message}</p>}
      {classLinks.length > 0 ? (
        <ul style={listStyle}>
          {classLinks.map((item, index) => (
            <li key={index} style={listItemStyle}>
              <strong style={mentorNameStyle}>Mentor: </strong>
              <span style={mentorNameStyle}>{item.mentorName}</span>
              <br />
              <a href={item.classLink} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                {item.classLink ? item.classLink : 'No link available'}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        !message && <p style={noLinksStyle}>No class links available.</p>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  padding: "40px",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  maxWidth: "800px",
  margin: "40px auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const headingStyle = {
  fontSize: "2.5rem",
  color: "#333",
  textAlign: "center",
  marginBottom: "20px",
};

const listStyle = {
  listStyleType: "none",
  padding: 0,
};

const listItemStyle = {
  backgroundColor: "#ffffff",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const mentorNameStyle = {
  fontWeight: "bold",
  color: "#4CAF50",
};

const linkStyle = {
  display: "inline-block",
  marginTop: "10px",
  color: "#2196F3",
  textDecoration: "none",
  fontSize: "16px",
  transition: "color 0.2s ease, transform 0.2s ease",
};

const messageStyle = {
  marginTop: "15px",
  fontSize: "16px",
  color: "#f44336",
  textAlign: "center",
};

const noLinksStyle = {
  textAlign: "center",
  fontSize: "16px",
  color: "#888",
};

export default Classes;
