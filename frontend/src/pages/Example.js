import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  console.log(data);
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await axios.get('http://localhost:8000/api/scores/');
  //     setData(response.data);
  //   }
  //   fetchData();
  // }, []);
  useEffect(() => {
    async function fetchData() {
        const response = await axios.get('https://givplus.duckdns.org/api/countries/');
        setData(response.data);
    }
    fetchData();
  }, []);

  return (
    // <div>
    // <h1>Results:</h1>
    // <table>
    //   <thead>
    //     <tr>
    //       <th>Country</th>
    //       <th>Currency</th>
    //       <th>PPP Log</th>
    //       <th>Currency Abbreviation</th>
    //       <th>Forex Score</th>
    //       <th>Final Score</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //         {data.map((item) => (
    //             <tr key={item.id}>
    //                 <td>{item.country}</td>
    //                 <td>{item.currency}</td>
    //                 <td>{item.ppp_log}</td>
    //                 <td>{item.currency_abbreviation}</td>
    //                 <td>{item.forex_score}</td>
    //                 <td>{item.final_score}</td>
    //             </tr>
    //         ))}
    //     </tbody>
    // </table>
    // </div>
    <div>
    <h1>Results:</h1>
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Continent</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.continent}</td>
                    <td>{item.description.Summary}</td>

                </tr>
            ))}
        </tbody>
    </table>
    </div>
  );
}

export default App;


// This code will make a GET request to the /api/results/ endpoint (assuming you have defined the endpoint correctly in your Django urls.py file). 
// The response data will be stored in the data state variable using the setData function. The useEffect hook is used to ensure the API request is only made once when the component is mounted.

// The data is then displayed using map() function in the JSX template. The key attribute is used to uniquely identify each item in the data array.





