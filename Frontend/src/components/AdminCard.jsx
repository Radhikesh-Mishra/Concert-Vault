import React, { useState } from "react";
import { Modal, Button, Form, Card } from 'react-bootstrap';

const AdminCard = (props) => {
    return(
        <Card className="w3-hover-shadow w3-border-black" style={{ margin: '1rem' }}>
        <Card.Img 
            variant="top" 
            src={props.concert.imageUrl} 
            alt={props.concert.concertLocation} 
            style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
        />
        <Card.Body className="w3-white">
            <Card.Title><b>{props.concert.concertLocation}</b></Card.Title>
            <Card.Text className="w3-opacity">
                {props.concert.concertDate}
            </Card.Text>
            <Card.Text >
                Available Tickets : {props.concert.totalTickets}
            </Card.Text>
            <Card.Text >
                Ticket Price : {props.concert.ticketPrice}
            </Card.Text>
            <Card.Text style={{fontSize:'small'}}>{props.concert.content}</Card.Text>
        </Card.Body>
    </Card>

    );
}

export default AdminCard;