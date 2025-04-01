import {API_BOOKING, API_CABIN} from "../../../utility/constants.tsx";

export async function postBooking(checkIn: Date, checkOut: Date, id, totalPrice) {
    const token = localStorage.getItem("token");

    try {
        const bookingData = {
            startDate: checkIn.toISOString().split("T")[0],
            endDate: checkOut.toISOString().split("T")[0],
            cabinId: id,
            totalPrice: totalPrice
        };

        const response = await fetch(`${API_BOOKING}${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
            throw response;
        }

        const data = await response.json();
        console.log("Booking successful!", data);
        return data;
    } catch (error) {
        console.error("Booking error:", error);
        throw error;
    }
}
