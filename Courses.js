// import React, { useRef, useState } from "react";
// import "./Homepage.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; 

// const Courses = () => {
//   const navigate = useNavigate();
//   const coursesListRef = useRef(null); // Ensure this ref is defined
//   const [activeButton, setActiveButton] = useState(null);

//   const courses = [
//     "Programming",
//     "Web Development",
//     "Database Management",
//     "Cloud Computing",
//     "Cybersecurity",
//     "Data Science and Analytics",
//     "Artificial Intelligence and Machine Learning",
//     "Version Control and Collaboration",
//   ];

//   const scrollLeft = () => {
//     if (coursesListRef.current) {
//       coursesListRef.current.scrollBy({ left: -400, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (coursesListRef.current) {
//       coursesListRef.current.scrollBy({ left: 400, behavior: "smooth" });
//     }
//   };

//   const handleButtonClick = async (index) => {
//     // Define selectedCourse based on the condition
//     // navigate("/Courseinfo");
//     let selectedCourse;
//     selectedCourse = courses[index].toLowerCase().replace(/ /g, "_"); // Convert to expected format
  
//     try {
//       // Send the course name to the backend
//       await axios.post("http://localhost:8081/courseinfo1", {
//         courseName: selectedCourse,
//       });
  
//       // Navigate to the course info page
//       navigate("/Courseinfo");
//     } catch (error) {
//       console.error("Error sending course data to the backend:", error);
//     }
//   };
  

//   return (
//     <div className="courses-container">
//       <button className="arrow-button left-arrow" onClick={scrollLeft}>
//         ❮
//       </button>
//       <div className="courses-list" ref={coursesListRef}>
//         {courses.map((course, index) => (
//           <button
//             key={index}
//             className={`course-button ${activeButton === index ? "active" : ""}`}
//             onClick={() => {
//               setActiveButton(index); // Highlight the selected button
//               handleButtonClick(index); // Call the click handler
//             }}
//           >
//             {course}
//           </button>
//         ))}
//       </div>
//       <button className="arrow-button right-arrow" onClick={scrollRight}>
//         ❯
//       </button>
//     </div>
//   );
// };
