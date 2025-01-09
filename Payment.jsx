import React, { useState } from "react"; // Import useState hook
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate hooks
import "./Payment.css"
const Payment = () => {
  const location = useLocation(); // Get data passed via state
  const navigate = useNavigate(); // Use navigate hook
  const mentor = location.state?.mentor; // Access mentor details
  const [studentName, setStudentName] = useState(""); // State for student name
  const [studentEmail, setStudentEmail] = useState(""); // State for student email
  const [securityId, setSecurityId] = useState(""); // State for security ID

  // If no mentor is selected, show a message
  if (!mentor) {
    return <p>No mentor selected. Please go back and select a mentor.</p>;
  }

  // Handle payment
  const handlePayment = () => {
    // Validate the form input
    if (!studentName || !studentEmail || !securityId) {
      alert("Please fill in all fields.");
      return;
    }

    // Prepare payment data
    const paymentData = {
      studentId: 1, // Replace with actual student ID (from logged-in user)
      studentName,
      studentEmail,
      mentorName: mentor.name, // Send mentor name instead of course name
      securityId,
      price: mentor.price,
    };

    // Send payment data to the backend
    fetch("http://localhost:8081/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Payment successful:", data);
        navigate("/confirmation", { state: { mentor } }); // Navigate to confirmation page
      })
      .catch((error) => {
        console.error("Error during payment:", error);
      });
  };

  return (
    <div className="payment-container">
      <h1>Payment Page</h1>
      <div className="payment-details">
        <p><strong>Mentor:</strong> {mentor.name}</p>
        <p><strong>Expertise:</strong> {mentor.selling_line}</p>
        <p><strong>Price:</strong> ${mentor.price}</p>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Your Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Security ID"
          value={securityId}
          onChange={(e) => setSecurityId(e.target.value)}
        />
      </div>
      <button className="pay-button" onClick={handlePayment}>
        Pay ${mentor.price}
      </button>
    </div>
  );
};

export default Payment;
