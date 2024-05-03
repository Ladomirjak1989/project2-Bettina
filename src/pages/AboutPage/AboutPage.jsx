import React from "react";
import "./AboutPage.css";
import { Link } from "react-router-dom";


const AboutPage = () => {
  return (
   <div className="about-page">
    <Link className="about-btn" to="/" role="button">
            GO HOME
          </Link>
      <h3 className="about-title">
        Welcome To FlavorFinds App!
      </h3>
      <div className="content">
      <p>
        FlavorFinds App is a Professional food Platform. Here we will provide you only
        interesting content, which you will like very much. We're dedicated to
        providing you the best of food, with a focus
        on dependability and reserve the table. We're
        working to turn our passion for food into a
        booming
        .We hope you enjoy our food as much as we enjoy offering them to you.
        </p>
      <p>
        We will keep posting more important posts on our Website for all of you.
        Please give your support and love.
       </p>
      </div>
      <div>
     <p className="greetings">
        Thanks For Visiting Our Site
        <br />
        <span className="msg">
          Have a nice day!
        </span>
      </p>
      </div>
      </div>
    
  );
};

export default AboutPage;
