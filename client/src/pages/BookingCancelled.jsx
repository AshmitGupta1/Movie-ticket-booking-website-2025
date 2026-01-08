import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const BookingCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <XCircle className="w-20 h-20 text-yellow-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Booking Cancelled
        </h1>
        
        <p className="text-gray-300 mb-8">
          Your booking was cancelled. The seats you selected have been released 
          and are now available for other users.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Go to Homepage
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCancelled;
