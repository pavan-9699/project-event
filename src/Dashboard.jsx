import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import UserProfileModel from "./UserProfileModel";
import { QRCodeCanvas } from "qrcode.react"; // Corrected import for QRCodeCanvas

function Dashboard() {
  const [userData, setUserData] = useState({});
  const [userEvents, setUserEvents] = useState([]);
  const [scheduledEvents, setScheduledEvents] = useState([]);
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchUserData(token);
      fetchUserEvents(token);
      fetchScheduledEvents(token);
    }
  }, [token]);

  const openUserProfileModal = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    setShowUserProfileModal(true);
  };

  const closeUserProfileModal = () => {
    setShowUserProfileModal(false);
  };

  const fetchUserEvents = async (token) => {
    try {
      const response = await fetch("https://ticket-a8ez.onrender.com/event", {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserEvents(data.userEvents);
      } else {
        console.error("Failed to fetch user events.");
      }
    } catch (error) {
      console.error("Error during fetchUserEvents:", error);
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("https://ticket-a8ez.onrender.com/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchScheduledEvents = async (token) => {
    try {
      const response = await fetch("https://ticket-a8ez.onrender.com/ticket/user", {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setScheduledEvents(data.userTickets);
      } else {
        console.error("Error fetching scheduled events");
      }
    } catch (error) {
      console.error("Error fetching scheduled events:", error);
    }
  };

  // Define formatDate function here
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="dashboard">
  
        <span className="left">
            <h1>Bookings</h1>
        </span>
        <br>
        </br>
        <br>
        </br> <br>
        </br> <br>
      
        </br>
      <div className="user-events">
        {scheduledEvents.map((event) => (
          <div key={event._id} className="user-event">
            <h2>{event.event.title}</h2>
            <h2>Date: {formatDate(event.event.date)}</h2>
            <h2>Venue: {event.event.venue}</h2>
            <br></br>
            <QRCodeCanvas value={"QR_Code_Data_for_Your_Event"} size={128} />
            <br></br>
            <br></br>
            <br></br>
          </div>
        ))}
      </div>

      {showUserProfileModal && (
        <UserProfileModel user={user} onClose={closeUserProfileModal} />
      )}
    </div>
  );
}

export default Dashboard;
