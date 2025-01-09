import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Moderation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/login_moderation", formData);
  
      if (response.data.success) {
        alert("Logged in successfully!");
  
        // Store the user ID in localStorage (or you can use context/state)
        localStorage.setItem("userId", response.data.user.id);
  
        // Redirect to the student dashboard or fetch student info
        navigate("/Checking");
  
        // Fetch student info from the server
        const studentInfoResponse = await axios.get("http://localhost:8081/moderatorinfo", {
          params: { userId: response.data.user.id }
        });
  
        console.log("Student info:", studentInfoResponse.data);
  
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error.response ? error.response.data : error);
      alert("An error occurred. Please try again.");
    }
  };
  
  

  return (
    <div style={containerStyle}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
      >
        <source src="/back.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div style={overlayStyle}></div>

      {/* Form Content */}
      <div style={formContainerStyle}>
        <h1 style={headerStyle}>Moderator Login</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputContainerStyle}>
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={inputStyle}
            />
          </div>

          <div style={inputContainerStyle}>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>

      </div>
    </div>
  );
};

const containerStyle = {
  position: "relative",
  height: "100vh",
  overflow: "hidden",
  fontFamily: "Arial, sans-serif",
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1,
};

const formContainerStyle = {
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  marginTop: "50px",
};

const formStyle = {
  display: "inline-block",
  backgroundColor: "rgb(240, 240, 240)",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
  textAlign: "left",
};

const inputContainerStyle = {
  marginBottom: "15px",
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
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#4CAF50",
  color: "white",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const headerStyle = {
  color: "#ffff",
};

const signupTextStyle = {
  marginTop: "20px",
  fontSize: "14px",
  color: "#555",
};

const signupLinkStyle = {
  color: "#007BFF",
  textDecoration: "underline",
  cursor: "pointer",
};

export default Moderation;
