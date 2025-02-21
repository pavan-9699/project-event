import React, { useState, useEffect } from "react";
import "./Events.css";
import { Link } from "react-router-dom";
import UserProfileModel from "./UserProfileModel";
import { QRCodeCanvas } from "qrcode.react"; 
import { useNavigate } from "react-router-dom";
// Corrected import for QRCodeCanvas

function Events() {
  const [events, setEvents] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showAlreadyBookedPopup, setShowAlreadyBookedPopup] = useState(false);
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [user, setUser] = useState();
const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEvents();
  }, []);

  const openUserProfileModal = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    setShowUserProfileModal(true);
  };

  const closeUserProfileModal = () => {
    setShowUserProfileModal(false);
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const fetchEvents = async () => {
    try {
      const response = await fetch("https://ticket-a8ez.onrender.com/event/all", {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events.");
      }
    } catch (error) {
      console.error("Error during fetchEvents:", error);
    }
  };

  // Function to handle booking an event
  const handleBookEvent = async (eventId) => {
    try {
      const response = await fetch(`https://ticket-a8ez.onrender.com/ticket/user`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch user tickets.");
        return;
      }

      const data = await response.json();
      const userTickets = data.userTickets;

      const isAlreadyBooked = userTickets.some((ticket) => ticket.event._id === eventId);

      if (isAlreadyBooked) {
        setShowAlreadyBookedPopup(true);
      } else {
        const bookResponse = await fetch(`https://ticket-a8ez.onrender.com/ticket`, {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId }),
        });

        if (bookResponse.ok) {
          setShowSuccessPopup(true);
          navigate("/dashboard")

        } else {
          console.error("Failed to book event.");
        }
      }
    } catch (error) {
      console.error("Error during event booking:", error);
    }
  };

  return (
    <div className="events">
      {/* Event cards */}
      <div className="event-cards">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Date: {formatDate(event.date)}</p>
            <p>Venue: {event.venue}</p>
            <p>Price: ${event.price}</p>
            <button
              className="book-button"
              onClick={() => handleBookEvent(event._id)}
            >
              Book
            </button>
          </div>
        ))}
      </div>

      {/* Success Pop-up */}
      {showSuccessPopup && (
        <div className="popup success-popup">
          <p>Event booked successfully!</p>
          {/* Display QR Code */}
          <QRCodeCanvas value={"QR_Code_Data_for_Your_Event"} size={128} />
          <button onClick={() => setShowSuccessPopup(false)}>Close</button>
        </div>
      )}

      {/* Already Booked Pop-up */}
      {showAlreadyBookedPopup && (
        <div className="popup error-popup">
          <p>Event is already booked!</p>
          <button onClick={() => setShowAlreadyBookedPopup(false)}>Close</button>
        </div>
      )}

      {showUserProfileModal && (
        <UserProfileModel user={user} onClose={closeUserProfileModal} />
      )}
    </div>
  );
}

export default Events;
