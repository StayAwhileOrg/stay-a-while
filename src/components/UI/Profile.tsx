import {Link} from "react-router-dom";

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
  cabin: {
    title: string;
    images: { imgURL: string; imgAlt: string }[];
  };
  owner: any;
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
  cabin: {
    title: string;
    images: { imgURL: string; imgAlt: string }[];
  };
  owner: any;
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

  console.log(profile.profile);
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <div className="flex items-center gap-6 border-b pb-6">
      <img
        src={profile.profile.image.imgUrl}
        alt={profile.profile.image.imgAlt}
        className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
      />
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {profile.profile.name.firstName} {profile.profile.name.lastName}
        </h2>
        <p className="text-gray-600">{profile.profile.email}</p>
        <p className="text-gray-600">📞 {profile.profile.phone}</p>
        <p className="text-gray-600 italic">"{profile.profile.bio}"</p>
        <p className="mt-2 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-md w-fit">
          ⭐ Average Rating: {averageRating}
        </p>
      </div>
    </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">📌 Upcoming trips</h3>
        {profile.profile.bookedCabins.length > 0 ? (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.profile.bookedCabins
              .filter((cabin) => cabin.cabin !== null)
              .map((cabin) => (
                <Link to={`/manageBookings/${cabin._id}`} key={cabin._id} className="border rounded-lg overflow-hidden shadow-sm cursor-pointer">
                  <img
                    src={cabin.cabin?.images?.[0]?.imgURL || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"}
                    alt={cabin.cabin?.images?.[0]?.imgAlt || "No image available"}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">{cabin.cabin?.title || "No title available"}</h4>
                    <p className="text-gray-600 text-sm">
                      📅 {new Date(cabin.startDate).toLocaleDateString()} →{" "}
                      {new Date(cabin.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 font-medium">💰 {cabin.totalPrice} Kr</p>
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-3">No booked cabins.</p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800">📍 Bookings</h3>
        {profile.profile.postedBookings.length > 0 ? (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.profile.postedBookings
              .filter((booking) => booking.cabin !== null)
              .map((booking) => (
                <Link to={`/manageBookings/${booking._id}`} key={booking._id} className="border rounded-lg overflow-hidden shadow-sm cursor-pointer">
                  <img
                    src={booking.cabin?.images?.[0]?.imgURL}
                    alt={booking.cabin?.images?.[0]?.imgAlt}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">{booking.cabin?.title}</h4>
                    <p className="text-gray-600 text-sm">
                      📅 {new Date(booking.startDate).toLocaleDateString()} →{" "}
                      {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 font-medium">💰 {booking.totalPrice} Kr</p>
                    <p>Status: {booking.status}</p>
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-3">No posted bookings.</p>
        )}
      </div>
    </div>
  );
}
