import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import Slides from "./Slides";
import About from "./About";
import Card from "./ConcertCard";
import ContactSection from "./Contact";

const UserPage = () => {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/concerts'); 
        setConcerts(response.data);
      } catch (error) {
        console.error('Error fetching concerts:', error);
      }
    };

    fetchConcerts();
  },[]);

  return (
    <div className="w3-content" style={{ maxWidth: '2000px', marginTop: '46px' }}>
      <Slides />
      <About />
      <div className="w3-black" style={{ padding: '3rem 0' }} id="tour">
        <h2 className="w3-center w3-wide">Upcoming Concerts</h2>
        <p className="w3-opacity w3-center">Remember to buy your tickets</p>
        <div className="card-container w3-padding-16" id="concerts">
          {/* Render a Card for each concert fetched from the API */}
          {concerts.length > 0 ? (
            concerts.map((concert, index) => (
              <Card key={index} concert={concert} />
            ))
          ) : (
            <p className="w3-center">No concerts available.</p>
          )}
        </div>
      </div>
      <ContactSection />
    </div>
  );
};

export default UserPage;
