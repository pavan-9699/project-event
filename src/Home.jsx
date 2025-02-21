import React from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const nav = useNavigate();
  return (
    <div className="App">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to the Event Booking System</h1>
          <p>Your one-stop solution for booking events effortlessly.</p>
          <button
          onClick={() => nav("/events")}
          >Book Now</button>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-content">
          <h2 style={{color:"black"}}>About Us</h2>
          <p>We provide an easy and convenient platform for booking events of all kinds. Whether it's a concert, conference, or workshop, we've got you covered!</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 style={{color:"black"}}>Our Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Easy Booking</h3>
            <p>Our platform allows for quick and hassle-free event bookings.</p>
          </div>
          <div className="feature-card">
            <h3>Secure Payments</h3>
            <p>We ensure your payments are safe and secure with top-notch encryption.</p>
          </div>
          <div className="feature-card">
            <h3>Wide Range of Events</h3>
            <p>From concerts to workshops, we offer a variety of events to choose from.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Event Booking System</p>
      </footer>
    </div>
  );
}

export default Home;
