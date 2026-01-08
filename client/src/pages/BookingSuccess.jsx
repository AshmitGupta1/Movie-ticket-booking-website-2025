import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const BookingSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // You can verify the session with your backend here if needed
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Booking Confirmed!
        </h1>
        
        <p className="text-gray-300 mb-8">
          Your payment was successful and your booking has been confirmed. 
          A confirmation email has been sent to your email address.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/my-bookings')}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition"
          >
            View My Bookings
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
