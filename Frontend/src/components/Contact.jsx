import React, { useState } from "react";
import axios from "axios";

const ContactSection = () => {
    // State variables to manage form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:9000/api/contact', {
                name,
                email,
                message
            });

            setResponseMessage("Your message has been sent successfully!");
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.error("There was an error sending the message!", error);
            setResponseMessage("Failed to send your message. Please try again later.");
        }
    };

    return (
        <div className="w3-container w3-content w3-padding-64" style={{ maxWidth: '800px' }} id="contact">
            <h2 className="w3-wide w3-center">CONTACT</h2>
            <p className="w3-opacity w3-center"><i>Fan? Drop a note!</i></p>
            <div className="w3-row w3-padding-32">
                <div className="w3-col m6 w3-large w3-margin-bottom">
                    <i className="fa fa-map-marker" style={{ width: '30px' }}></i> Ghaziabad, IND<br />
                    <i className="fa fa-phone" style={{ width: '30px' }}></i> Phone: +00 151515<br />
                    <i className="fa fa-envelope" style={{ width: '30px' }}></i> Email: example@mail.com<br />
                </div>
                <div className="w3-col m6">
                    <form onSubmit={handleSubmit}>
                        <div className="w3-row-padding" style={{ margin: '0 -16px 8px -16px' }}>
                            <div className="w3-half">
                                <input
                                    type="text"
                                    className="w3-input w3-border"
                                    placeholder="Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="w3-half">
                                <input
                                    type="email"
                                    className="w3-input w3-border"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <input
                            type="text"
                            className="w3-input w3-border"
                            placeholder="Message"
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="w3-button w3-black w3-section w3-right" type="submit">SEND</button>
                    </form>
                    {responseMessage && <p className="w3-center w3-margin-top">{responseMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default ContactSection;
