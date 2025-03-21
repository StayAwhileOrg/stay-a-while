import { useMemo } from "react";

// Define the hook
export function useTotalPrice(
    checkIn: Date | null,
    checkOut: Date | null,
    pricePerNight: number
): number | null {

    const totalPrice = useMemo(() => {

        if (!checkIn || !checkOut) return null;

        const timeDifference = checkOut.getTime() - checkIn.getTime();

        const daysStayed = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        if (daysStayed <= 0) return null;

        return daysStayed * pricePerNight;
    }, [checkIn, checkOut, pricePerNight]);

    return totalPrice;
}