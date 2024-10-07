import React, { useEffect, useState } from "react";
import Slides from "./Slides";
import AdminCard from "./AdminCard";
import axios from "axios";
import About from "./About";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import '../App.css';

const AdminPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [concertDate, setConcertDate] = useState('');
  const [concertLocation, setConcertLocation] = useState('');
  const [totalTickets, setTotalTickets] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/concerts');
        setConcerts(response.data);
      } catch (error) {
        setError('Error fetching concerts. Please try again later.');
        console.error('Error fetching concerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('concertDate', concertDate);
    formData.append('concertLocation', concertLocation);
    formData.append('totalTickets', totalTickets);
    formData.append('ticketPrice', ticketPrice);
    formData.append('image', image);
    formData.append('content', content);

    try {
      const response = await axios.post('http://localhost:9000/api/newConcerts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(response.data);
      alert("Concert added successfully!");
      setShowModal(false);
      setConcertDate('');
      setConcertLocation('');
      setTotalTickets('');
      setTicketPrice('');
      setImage(null);
      setContent('');
      await fetchConcerts();
    } catch (error) {
      console.error("There was an error adding the concert!", error);
      alert("Failed to add concert. Please try again.");
    }
  };

  return (
    <div className="w3-content" style={{ maxWidth: '2000px', marginTop: '46px' }}>
      <Slides />
      <About />
      <div className="w3-black" style={{ padding: '3rem 0' }} id="tour">
        <h2 className="w3-center w3-wide">Upcoming Concerts</h2>
        <div className="card-container w3-padding-16" id="concerts">
          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <p className="w3-center">{error}</p>
          ) : concerts.length > 0 ? (
            concerts.map((concert) => (
              <AdminCard key={concert.id} concert={concert} />
            ))
          ) : (
            <p className="w3-center">No concerts available.</p>
          )}
        </div>
        <p className="w3-center">
          <Button variant="primary" onClick={handleModalShow}>
            New Concerts
          </Button>
        </p>
      </div>

      {/* Modal for Adding New Concert */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Concert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="concertDate">
              <Form.Label>Concert Date</Form.Label>
              <Form.Control
                type="date"
                value={concertDate}
                onChange={(e) => setConcertDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="concertLocation">
              <Form.Label>Concert Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={concertLocation}
                onChange={(e) => setConcertLocation(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="totalTickets">
              <Form.Label>Total Tickets</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of tickets"
                value={totalTickets}
                onChange={(e) => setTotalTickets(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="ticketPrice">
              <Form.Label>Ticket Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ticket price"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Concert Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Concert Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter concert description"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Concert
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminPage;
