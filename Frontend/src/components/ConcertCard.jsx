import React, { useState } from "react";
import { Modal, Button, Form, Card } from 'react-bootstrap';
import axios from 'axios'; 

const ConcertCard = (props) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [numberOfTickets, setNumberOfTickets] = useState(1);

    const totalAmount = props.concert.ticketPrice * numberOfTickets;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePurchase = async (e) => {
        e.preventDefault();

        const purchaseData = {
            name,
            email,
            mobile,
            numberOfTickets,
            concertLocation: props.concert.concertLocation,
            concertDate: props.concert.concertDate,
            concertId: props.concert._id,
        };

        try {
            const response = await axios.post('http://localhost:9000/api/buyTickets', purchaseData);
            console.log(response.data); 
            alert(`Successfully purchased ${numberOfTickets} tickets for ${props.concert.concertLocation}.`);
        } catch (error) {
            console.error('Error purchasing tickets:', error);
            alert('Failed to purchase tickets. Please try again.');
        } finally {
            handleClose(); 
        }
    };

    return (
        <>
            <Card className="w3-hover-shadow w3-border-black" style={{ margin: '1rem' }}>
                <Card.Img 
                    variant="top" 
                    src={props.concert.imageUrl} 
                    alt={props.concert.location} 
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                />
                <Card.Body className="w3-white">
                    <Card.Title><b>{props.concert.concertLocation}</b></Card.Title>
                    <Card.Text className="w3-opacity">
                        {props.concert.concertDate}
                    </Card.Text>
                    <Card.Text>
                        Available Tickets: {props.concert.totalTickets}
                    </Card.Text>
                    <Card.Text style={{fontSize:'small'}}>
                        Ticket Price: ${props.concert.ticketPrice}
                    </Card.Text>
                    <Card.Text>{props.concert.content}</Card.Text>
                    <p className="w3-center w3-margin-top">
                        <Button variant="dark" className="w3-center" onClick={handleShow}>
                            Buy Tickets
                        </Button>
                    </p>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Buy Tickets</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handlePurchase}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formMobile">
                            <Form.Label>Mobile No.</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter your mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTickets">
                            <Form.Label>Number of Tickets</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                value={numberOfTickets}
                                onChange={(e) => setNumberOfTickets(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-between mt-3">
                            <h5>Total Amount: ${totalAmount}</h5>
                            <Button variant="success" type="submit">
                                Purchase
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ConcertCard;
