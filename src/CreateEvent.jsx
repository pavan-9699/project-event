import React, { useState } from "react";
import "./CreateEvent.css";
import { Link, useNavigate } from "react-router-dom";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch("https://ticket-a8ez.onrender.com/event/create", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, date, venue, price }),
      });

      if (response.ok) {
        alert("Event created successfully!");
        navigate("/events")
        
      } else {
        alert("Failed to create event.");
        console.error("Failed to create event.");
      }
    } catch (error) {
      alert("Error creating event.");
      console.error("Error creating event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-event">

      {/* Create Event Form */}
      <div className={`create-event-form ${isLoading ? "loading" : ""}`}>
        <h2>Create Event</h2>
        <form onSubmit={handleCreateEvent}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <button type="submit">Create Event</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
