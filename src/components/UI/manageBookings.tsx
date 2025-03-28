import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BOOKING } from "../../utility/constants";

export function ManageBooking() {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<string | null>(null);
    const [booking, setBooking] = useState<any>(null);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        async function fetchBooking() {
            try {
                const response = await fetch(`${API_BOOKING}${bookingId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch booking");
                }

                const data = await response.json();
                console.log(data);
                
                setBooking(data);
                setStatus(data.status);

                const userId: string | null = JSON.parse(localStorage.getItem("user") ?? "null")?.userId ?? null;

                if (!userId) {
                    throw new Error("User ID not found in localStorage");
                }
                
                setIsOwner(data.owner._id === userId);
            } catch (error) {
                console.error(error);
                alert("Failed to fetch booking details");
            }
        }

        fetchBooking();
    }, [bookingId]);

    async function updateBookingStatus(newStatus: string) {
        try {
            const response = await fetch(`${API_BOOKING}${bookingId}`, { 
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });
    
            if (!response.ok) {
                const errorData = await response.json(); 
                console.error("Error Response:", errorData);
                throw new Error(errorData.message || "Failed to update booking status");
            }
    
            const updatedBooking = await response.json();
            console.log("Updated Booking:", updatedBooking); 
            setStatus(updatedBooking.status); 
            
        } catch (error) {
            console.error("Request Error:", error);
            alert("Failed to update booking status");
        }
    }

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Booking {bookingId}</h1>
            
            {booking ? (
                <div className="space-y-4">
                    <img
                        src={booking.cabin?.images?.[0]?.imgURL}
                        alt={booking.cabin?.images?.[0]?.imgAlt}
                        className="w-full h-56 object-cover rounded-md"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <p className="text-lg font-medium">🏡 Title: {booking.cabin.title}</p>
                        <p className="text-lg font-medium">
                            👤 Guest: {booking.guest.name.firstName} {booking.guest.name.lastName}
                        </p>
                        <p className="text-lg text-gray-700">📅 Check-in: {formatDate(booking.startDate)}</p>
                        <p className="text-lg text-gray-700">📅 Check-out: {formatDate(booking.endDate)}</p>
                        <p className="text-lg font-semibold text-blue-600">💰 Price: {booking.totalPrice} Kr</p>
                        <p className="text-lg font-semibold">
                            Status: <span className={`px-2 py-1 rounded-md ${status === "confirmed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {status || "Pending"}
                            </span>
                        </p>
                    </div>

                    <div className="flex gap-4 mt-4">
                        {isOwner && (
                            <button 
                                onClick={() => {updateBookingStatus("confirmed");
                                    navigate("/profile")
                                }}
                                className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
                            >
                                Accept
                            </button>
                        )}
                        <button 
                            onClick={() => updateBookingStatus("cancelled")}
                            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                        >
                            cancel
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600 text-center">Loading booking details...</p>
            )}
        </div>
    );
}
