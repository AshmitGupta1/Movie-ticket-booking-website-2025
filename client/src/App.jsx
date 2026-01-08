import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import SeatSelection from './pages/SeatSelection';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import AddShow from './pages/AddShow';
import ListShows from './pages/ListShows';
import ListBookings from './pages/ListBookings';
import BookingSuccess from './pages/BookingSuccess';
import BookingCancelled from './pages/BookingCancelled';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/seat-selection/:showId" element={<SeatSelection />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/booking-cancelled" element={<BookingCancelled />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add-show" element={<AddShow />} />
            <Route path="/admin/shows" element={<ListShows />} />
            <Route path="/admin/bookings" element={<ListBookings />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;

