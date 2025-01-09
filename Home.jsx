import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    interests: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        interests: checked
          ? [...prevData.interests, value]
          : prevData.interests.filter((interest) => interest !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/signup", formData);
      alert("Data submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error submitting data");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Sign-Up</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputContainerStyle}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Full Name"
            required
          />
        </div>

        <div style={inputContainerStyle}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
          />
        </div>

        <div style={inputContainerStyle}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
          />
        </div>

        <div style={inputContainerStyle}>
          <label htmlFor="phone">Phone No.</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            required
          />
        </div>

        <div style={inputContainerStyle}>
          <label htmlFor="interest">Interested In</label>
          <fieldset style={{ textAlign: "left" }}>
            <div>
              <input
                type="checkbox"
                name="interests"
                value="Programming and Software Development"
                onChange={handleChange}
              />
              Programming and Software Development
            </div>
            <div>
              <input
                type="checkbox"
                name="interests"
                value="Web Development"
                onChange={handleChange}
              />
              Web Development
            </div>
            <div>
              <input
                type="checkbox"
                name="interests"
                value="Database Management"
                onChange={handleChange}
              />
              Database Management
            </div>
            <div>
              <input
                type="checkbox"
                name="interests"
                value="Cloud Computing"
                onChange={handleChange}
              />
              Cloud Computing
            </div>
            <div>
              <input
                type="checkbox"
                name="interests"
                value="Cybersecurity"
                onChange={handleChange}
              />
              Cybersecurity
            </div>
            <div>
              <input
                type="checkbox"
                name="interests"
                value="Data Science and Analytics"
                onChange={handleChange}
              />
              Data Science and Analytics
            </div>
            <div>
              <input
                type="checkbox"
                name="interests"
                value="Artificial Intelligence and Machine Learning"
                onChange={handleChange}
              />
              Artificial Intelligence and Machine Learning
            </div>
            <div>
              <input
                type="checkbox"
                name="interests"
                value="Version Control and Collaboration"
                onChange={handleChange}
              />
              Version Control and Collaboration
            </div>
          </fieldset>
        </div>

        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};

const formStyle = {
  display: "inline-block",
  backgroundColor: "rgb(171, 160, 186)",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const inputContainerStyle = {
  marginBottom: "15px",
};

const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Home;
