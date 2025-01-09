import React, { useEffect, useState } from "react";

function FetchTopMentor() {
  const [data, setData] = useState([]); // Renamed for clarity
  const [error, setError] = useState(null); // State for error messages

  useEffect(() => {
    fetch('http://localhost:8081/')
      .then(res => res.json())
      .then(data => setData(data)) // data is an array of arrays
      .catch(err => console.log(err));
  }, []);

  // Flatten the results (if they are nested arrays)
  const flattenedData = data.flat();

  return (
    <div>
      <h1>Top Mentors</h1>

      {/* Display error message if there is one */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display mentors data */}
      {flattenedData.length === 0 && !error ? (
        <p>No mentors found.</p>
      ) : (
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Expertise</th>
              <th>Rating</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {flattenedData.map((mentor) => (
              <tr key={mentor.id}>
                <td>{mentor.id}</td>
                <td>{mentor.name}</td>
                <td>{mentor.email}</td>
                <td>{mentor.selling_line}</td>
                <td>{mentor.rating}</td>
                <td>{mentor.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FetchTopMentor;
