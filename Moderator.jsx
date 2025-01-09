import React from 'react';
import { useNavigate } from 'react-router-dom';

const Moderator = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const buttonStyle = {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    margin: '10px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease',
  };

  const handleHover = (e) => {
    e.target.style.transform = 'scale(1.1)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = 'scale(1)';
  };

  // Corrected button click handlers
  const handleCourseEnrollClick = () => {
    navigate('/checking');
  };



  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hello Moderator</h1>
      <div>
        <button
          style={buttonStyle}
          onMouseOver={handleHover}
          onMouseLeave={handleMouseLeave}
          onClick={handleCourseEnrollClick} 
        >
          Handle Course Enroll Request
        </button>
      </div>
    </div>
  );
};

export default Moderator;
