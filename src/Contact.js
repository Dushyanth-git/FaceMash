import React from "react";
import "./Contact.css"; // Import the CSS file

const Contact = () => {
    return (
        <div className="contact">
            <h2>
                For any queries, please contact me at 
                <a href="mailto:dushyanthworks@gmail.com"> dushyanthworks@gmail.com</a>
            </h2>
            <img src="https://res-console.cloudinary.com/dll3jvt1p/thumbnails/v1/image/upload/v1726896543/cjI4bWR5endtbnhlN2VuaGtxNms=/drilldown" alt="Your Name" className="profile-pic" />
        </div>
    );
}

export default Contact;
