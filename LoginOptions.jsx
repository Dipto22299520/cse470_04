import React from "react";
import { useNavigate } from "react-router-dom";

const LoginOptions = () => {
  const navigate = useNavigate();

  const containerStyle = {
    marginTop: "100px",
    position: "relative",
    zIndex: 2,
  };

  const buttonStyle = {
    display: "block",
    width: "200px",
    padding: "15px",
    margin: "20px auto",
    fontSize: "18px",
    color: "white",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    zIndex: 2,
    position: "relative",
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

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
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
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better contrast */}
      <div style={overlayStyle}></div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <h1 style={{ marginTop: "50px", fontFamily: "Arial, sans-serif", color: "white" }}>
          Select Your Login
        </h1>

        <div style={containerStyle}>
          <button
            style={buttonStyle}
            onClick={() => navigate("/Facultylogin")}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Log In as a Mentor
          </button>
          <button
            style={buttonStyle}
            onClick={() => navigate("/StudentLogin")}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Log In as a Student
          </button>
          <button
            style={buttonStyle}
            onClick={() => navigate("/Moderation")}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Log In as a Moderator
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginOptions;
