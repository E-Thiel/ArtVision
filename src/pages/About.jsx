import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <h1>About ArtVision</h1>
            <p>
                Welcome to ArtVision, where we celebrate the beauty and creativity of art. Our platform is dedicated to connecting artists with art enthusiasts from around the world. We believe that art has the power to inspire, transform, and bring people together.
            </p>
            <p>
                At ArtVision, we offer a diverse collection of artworks, ranging from contemporary paintings to classic sculptures. Our mission is to provide a space where artists can showcase their work and art lovers can discover new and exciting pieces.
            </p>
            <p>
                Whether you are an artist looking to share your creations or an art enthusiast searching for the perfect piece to add to your collection, ArtVision is here to help you on your journey. Join us in celebrating the vibrant world of art.
            </p>
            <p>
                Our platform is designed to be user-friendly and accessible, making it easy for you to explore and find art that speaks to you. We are committed to supporting artists by providing them with the tools and resources they need to succeed.
            </p>
            <p>
                Thank you for being a part of the ArtVision community. Together, we can create a world where art is appreciated and celebrated by all.
            </p>
            <img 
                src="https://sanctuarymentalhealth.org/wp-content/uploads/2021/03/The-Starry-Night-1200x630-1-979x514.jpg.webp" 
                alt="The Starry Night" 
                className="about-image"
            />
        </div>
    );
};

export default About;