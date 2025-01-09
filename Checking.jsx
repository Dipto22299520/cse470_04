import React, { useEffect, useState } from "react";
import "./CheckingPage.css";

const Checking = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch requests from backend
    fetch("http://localhost:8081/checking")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
      })
      .catch((err) => console.error('Error fetching requests:', err));
  }, []);

  const handleAction = (student_name, student_email, action) => {
    fetch(`http://localhost:8081/action/${student_name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ student_email, action }), // Pass student_email and action in the body
    })
      .then((res) => res.text())
      .then((message) => {
        alert(message);
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.student_email !== student_email)
        ); // Update the UI by removing the handled request
      })
      .catch((err) => console.error('Error handling action:', err));
  };

  return (
    <div>
      <h1>Pending Requests</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Mentor Name</th>
            <th>Student Name</th>
            <th>Student Email</th>
            <th>Price</th>
            <th>Security ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.student_email}>  {/* Using student_email as the key */}
              <td>{request.mentor_name}</td>
              <td>{request.student_name}</td>
              <td>{request.student_email}</td>
              <td>{request.price}</td>
              <td>{request.security_id}</td>
              <td>
                <button onClick={() => handleAction(request.student_name, request.student_email, "accept")}>
                  Accept
                </button>
                <button onClick={() => handleAction(request.student_name, request.student_email, "reject")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Checking;
