import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'Administrator' && password === 'Admin@123') {
      setIsLoggedIn(true);
      setShowModal(false);
      navigate('/login');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    navigate('/');
  };

  const myFunction = () => {
    const x = document.getElementById('navDemo');
    if (x.className.indexOf('w3-show') === -1) {
      x.className += ' w3-show';
    } else {
      x.className = x.className.replace(' w3-show', '');
    }
  };

  return (
    <>
      <div className="w3-top">
        <div className="w3-bar w3-black w3-card">
          <a
            href="javascript:void(0)"
            className="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right"
            onClick={myFunction}
            title="Toggle Navigation Menu"
          >
            <i className="fa fa-bars"></i>
          </a>
          <a href="#" className="w3-bar-item w3-button w3-padding-large">
            HOME
          </a>
          <a
            href="#aboutUs"
            className="w3-bar-item w3-button w3-padding-large w3-hide-small"
          >
            ABOUT US
          </a>
          <a
            href="#tour"
            className="w3-bar-item w3-button w3-padding-large w3-hide-small"
          >
            TOUR
          </a>
          <a
            href="#contact"
            className="w3-bar-item w3-button w3-padding-large w3-hide-small"
          >
            CONTACT
          </a>
          <div className="w3-dropdown-hover w3-hide-small">
            <button className="w3-padding-large w3-button" title="More">
              MORE <i className="fa fa-caret-down"></i>
            </button>
            <div className="w3-dropdown-content w3-bar-block w3-card-4">
              <a
                href="https://www.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w3-bar-item w3-button"
              >
                Merchandise
              </a>
              <a href="#" className="w3-bar-item w3-button">
                Extras
              </a>
              <a href="#" className="w3-bar-item w3-button">
                Media
              </a>
            </div>
          </div>

          {/* Admin and Logout buttons for large screens */}
          <div className="w3-right w3-hide-small" style={{ marginRight: '16px' }}>
            {isLoggedIn ? (
              <>
                <span className="w3-bar-item w3-button" style={{ paddingTop: '12px' }}>
                  Administrator
                </span>
                <Button variant="danger" className="w3-padding-large" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="success"
                className="w3-padding-large"
                onClick={() => setShowModal(true)}
              >
                Admin
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Navbar on small screens */}
      <div
        id="navDemo"
        className="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top"
        style={{ marginTop: '48px' }}
      >
        <a
          href="#band"
          className="w3-bar-item w3-button w3-padding-large"
          onClick={myFunction}
        >
          BAND
        </a>
        <a
          href="#tour"
          className="w3-bar-item w3-button w3-padding-large"
          onClick={myFunction}
        >
          TOUR
        </a>
        <a
          href="#contact"
          className="w3-bar-item w3-button w3-padding-large"
          onClick={myFunction}
        >
          CONTACT
        </a>
        <a
          href="https://www.amazon.com/"
          target='_blank'
          className="w3-bar-item w3-button w3-padding-large"
          onClick={myFunction}
        >
          MERCH
        </a>
        {/* Admin and Logout buttons for small screens */}
        {isLoggedIn ? (
          <a
            href="javascript:void(0)"
            className=" w3-red w3-bar-item w3-button w3-padding-large"
            onClick={handleLogout}
          >
            Logout
          </a>
        ) : (
          <a
            href="javascript:void(0)"
            className=" w3-red w3-bar-item w3-button w3-padding-large"
            onClick={() => setShowModal(true)}
          >
            Admin
          </a>
        )}
      </div>

      {/* Modal for Admin Login */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
