import React from "react";
import "./About.css"
const About = () => {
    return (
        <div className="about">
        <h3>FaceMash is a web application that allows users to upload images and compare them side by side to determine which one is better. 
           The application uses a simple Elo rating system to calculate the relative skill levels of the images and rank them accordingly.
           Users can also view the rankings of all images uploaded to the site.</h3>
           <h3>inspired by the original FaceMash project created by Mark Zuckerberg.</h3>
        <img className="mark" src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSsE9PYdaC2BdTHnGEgnDdu-sksRDDznhJo_RDkcmEVhc4pL7cXZPSxd_LRY1yeTTyKqjK3cNhFizqaato" alt="mark" />
        </div>



    );

    }

export default About;
