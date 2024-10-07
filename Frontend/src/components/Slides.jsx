import React, { useEffect, useState } from "react";

const Slides = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [
        { src: "la.jpg", title: "Los Angeles", caption: "We had the best time playing at Venice Beach!" },
        { src: "ny.jpg", title: "New York", caption: "The atmosphere in New York is amazing." },
        { src: "chicago.jpg", title: "Chicago", caption: "Thank you, Chicago - A night we won't forget." }
    ];

    useEffect(() => {
        // Automatic slideshow - change image every 4 seconds
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 4000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [slides.length]);
    
    return (
        <>
            {slides.map((slide, index) => (
                <div
                    className="mySlides w3-display-container w3-center"
                    style={{ display: index === currentIndex ? 'block' : 'none' }}
                    key={index}
                >
                    <img src={slide.src} style={{ width: '100%' }} alt={slide.title} />
                    <div className="w3-display-bottommiddle w3-container w3-text-white w3-padding-32 w3-hide-small">
                        <h3>{slide.title}</h3>
                        <p><b>{slide.caption}</b></p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Slides;
