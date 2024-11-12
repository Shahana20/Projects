import React, { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Change the URL to your Rails API endpoint
    axios.get('http://localhost:3000/your-api-endpoint')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Hi from rails</h1>
    </div>
  );
}

export default App;
