import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import api from '../lib/api';

const SeatSelection = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 10;

  useEffect(() => {
    fetchShow();
  }, [showId]);

  const fetchShow = async () => {
    try {
      const response = await api.get(`/show/${showId}`);
      setShow(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching show:', error);
      toast.error('Failed to load show details');
      setLoading(false);
    }
  };

  const toggleSeat = (seatId) => {
    if (show.occupiedSeats && show.occupiedSeats[seatId]) {
      toast.error('This seat is already booked');
      return;
    }

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = async () => {
    if (!isSignedIn) {
      toast.error('Please sign in to book tickets');
      return;
    }

    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }

    try {
      const response = await api.post('/booking/create', {
        userId: user.id,
        showId: show._id,
        bookedSeats: selectedSeats,
      });

      // Redirect to payment
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error(error.response?.data?.message || 'Failed to create booking');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Show not found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = selectedSeats.length * show.showPrice;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{show.movie.title}</h1>
          <p className="text-gray-400">
            {new Date(show.showDateTime).toLocaleString()}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Seat Selection */}
          <div className="md:col-span-3">
            {/* Screen */}
            <div className="mb-8">
              <div className="bg-gray-800 h-2 rounded-t-full mb-2"></div>
              <p className="text-center text-gray-400 text-sm">Screen</p>
            </div>

            {/* Seats Grid */}
            <div className="space-y-4">
              {rows.map((row) => (
                <div key={row} className="flex items-center justify-center space-x-2">
                  <span className="w-6 text-gray-400 font-semibold">{row}</span>
                  <div className="flex space-x-2">
                    {Array.from({ length: seatsPerRow }, (_, i) => {
                      const seatId = `${row}${i + 1}`;
                      const isOccupied = show.occupiedSeats && show.occupiedSeats[seatId];
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          onClick={() => toggleSeat(seatId)}
                          disabled={isOccupied}
                          className={`
                            w-8 h-8 rounded-t-lg text-xs font-semibold transition
                            ${isOccupied 
                              ? 'bg-gray-700 cursor-not-allowed' 
                              : isSelected 
                              ? 'bg-red-500 hover:bg-red-600' 
                              : 'bg-gray-600 hover:bg-gray-500'
                            }
                          `}
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-8 mt-8">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-600 rounded-t-lg"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-red-500 rounded-t-lg"></div>
                <span className="text-sm">Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-700 rounded-t-lg"></div>
                <span className="text-sm">Occupied</span>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Selected Seats</p>
                  <p className="font-semibold">
                    {selectedSeats.length > 0 
                      ? selectedSeats.join(', ') 
                      : 'None'}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Price per Seat</p>
                  <p className="font-semibold">${show.showPrice}</p>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-gray-400 text-sm">Total Amount</p>
                  <p className="text-2xl font-bold text-red-500">
                    ${totalAmount}
                  </p>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={selectedSeats.length === 0}
                className={`
                  w-full py-3 rounded-lg font-semibold transition
                  ${selectedSeats.length === 0
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600'
                  }
                `}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
