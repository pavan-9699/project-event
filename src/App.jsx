import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import Events from './Events';
import CreateEvent from './CreateEvent';
import Home from './Home';
import { useEffect, useState } from 'react';

function App() {
    const [happ, setApp] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const val = localStorage.getItem("token");
        const user = localStorage.getItem("username");
        if (val && user) {
            setApp(true);
            setUsername(user);
        }
    }, []);

    const handleLogout = () => {
        // Clear localStorage and update state
        localStorage.clear();
        setApp(false);
        setUsername('');
        window.location.href = '/login';  // Redirect to login page
    };

    return (
        <div className="app">
            <Router>
                <nav className="navbar">
                    <div className="nav-brand">EventHub</div>
                    
                    <div className="nav-links">
                        <Link to="/Home" className="nav-btn">Home</Link>
                        <Link to="/events" className="nav-btn">Events</Link>
                        <Link to="/create" className="nav-btn">Create Event</Link>
                        {/* Conditional rendering based on authentication state */}
                        {happ ? (
                            <>
                                <Link to="/dashboard" className="nav-btn">Dashboard</Link>
                               
                                <button onClick={handleLogout} className="nav-btn">Logout</button>
                                <h1 className="nav-btn">Welcome, {username}</h1>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-btn">Login</Link>
                                <Link to="/" className="nav-btn">Sign Up</Link>
                            </>
                        )}
                    </div>
                </nav>

                <div className="main-content">
                    <Routes>
                        <Route path="/Home" element={<Home />} />
                        <Route path="/" element={<SignupPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/events' element={<Events />} />
                        <Route path='/create' element={<CreateEvent />} />
                    </Routes>
                </div>
{/* 
                <footer className="footer">
                    <div className="footer-content">
                        <p>&copy; 2025 EventHub | Terms of Service | Privacy Policy | Contact</p>
                    </div>
                </footer> */}
            </Router>
        </div>
    );
}

export default App;
