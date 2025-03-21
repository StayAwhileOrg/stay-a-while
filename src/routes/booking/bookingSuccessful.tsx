import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export function RenderBookingSuccessful() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl border-2 border-green-500 shadow-lg text-center animate-fade-in">
        {FaCheckCircle({ className: 'text-green-500 w-16 h-16 mx-auto' })}
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Booking Successful!
        </h1>
        <p className="text-gray-600 mt-2">
          Your booking has been confirmed. We look forward to seeing you soon!
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-600 transition duration-300"
          >
            Go back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
