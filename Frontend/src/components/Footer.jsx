import React from "react";
import '../App.css'

const Footer = () => {
    return (
        <>
            <img src="map.jpg" style={{ width:"100vw"}} alt="" />
            <div className="w3-container w3-padding-64 w3-opacity w3-center w3-light-gray w3-xlarge">
                <a href="https:\\www.facebook.com" target="_blank" style={{padding:'0 15px'}}><i class="fa fa-facebook-official w3-hover-opacity"></i></a>
                <a href="https:\\www.instagram.com" target="_blank" style={{padding:'0 15px'}}><i class="fa fa-instagram w3-hover-opacity"></i></a>
                <a href="https:\\www.snapchat.com" target="_blank" style={{padding:'0 15px'}}><i class="fa fa-snapchat w3-hover-opacity"></i></a>
                <a href="https:\\www.pinterest.com" target="_blank" style={{padding:'0 15px'}}><i class="fa fa-pinterest-p w3-hover-opacity"></i></a>
                <a href="https:\\www.x.com" target="_blank" style={{padding:'0 15px'}}><i class="fa fa-twitter w3-hover-opacity"></i></a>
                <a href="https:\\www.linkedin.com" target="_blank" style={{padding:'0 15px'}}><i class="fa fa-linkedin w3-hover-opacity"></i></a>
            </div>
        </>
    );
}

export default Footer;