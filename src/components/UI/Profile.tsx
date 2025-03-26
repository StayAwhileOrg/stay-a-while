interface Profile {
    _id: string;
    name: {
        firstName: string;
        lastName: string;
    };
    email: string;
    phone: number;
    image: {
        imgUrl: string;
        imgAlt: string;
    };
    bio: string;
    averageRating: number | null;
    bookedCabins: Cabin[];
    postedBookings: Booking[];
    role: string;
    ratings: any[];
    createdAt: string;
    updatedAt: string;
}

interface Cabin {
    _id: string;
    guest: string;
    cabin: string;
    owner: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface Booking {
    _id: string;
    guest: string;
    cabin: string;
    owner: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface ProfileProps {
    profile: {
        profile: Profile;
    };
}

export function Profile({ profile }: ProfileProps) {
    const averageRating = profile.profile.averageRating ?? "N/A";

    return (
        <div className="border border-gray-300 p-4 rounded-lg">
            <img
                src={profile.profile.image.imgUrl}
                alt={profile.profile.image.imgAlt}
                className="w-24 h-24 rounded-full object-cover"
            />
            <h2 className="text-xl font-bold mt-2">
                Name: {profile.profile.name.firstName} {profile.profile.name.lastName}
            </h2>
            <p className="text-gray-700">Email: {profile.profile.email}</p>
            <p className="text-gray-700">Phone: {profile.profile.phone}</p>
            <p className="text-gray-700">Bio: {profile.profile.bio}</p>
            <p className="text-gray-700">Average Rating: {averageRating}</p>

            <div className="mt-4">
                <h3 className="text-lg font-semibold">Booked Cabins</h3>
                {profile.profile.bookedCabins.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {profile.profile.bookedCabins.map((cabin) => (
                            <li key={cabin._id} className="text-gray-700">
                                Cabin ID: {cabin.cabin}, Start Date: {new Date(cabin.startDate).toLocaleDateString()}, End Date: {new Date(cabin.endDate).toLocaleDateString()}, Total Price: ${cabin.totalPrice}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-700">No booked cabins.</p>
                )}
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Posted Bookings</h3>
                {profile.profile.postedBookings.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {profile.profile.postedBookings.map((booking) => (
                            <li key={booking._id} className="text-gray-700">
                                Booking ID: {booking._id}, Guest: {booking.guest}, Status: {booking.status}, Created At: {new Date(booking.createdAt).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-700">No posted bookings.</p>
                )}
            </div>
        </div>
    );
}
