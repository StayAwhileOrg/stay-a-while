import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchSingleCabin } from '../../hooks/api/ui/fetchSingleCabin.tsx';
import { LiaPencilAltSolid, LiaTrashAlt } from 'react-icons/lia';
import { BookingForm } from '../../components/forms/BookingForm.tsx';
import { Facilities } from '../../components/UI/Facilities.tsx';
import { ImageCarousel } from '../../components/UI/ImageCarousel.tsx';
import { deleteCabin } from '../../hooks/api/delete/deleteCabin.tsx';
import { RatingComponent } from '../../components/UI/RatingComponent.tsx';
import { postRating } from '../../hooks/api/post/postRating.tsx';

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  averageRating: number | null;
  imgUrl: string;
}

interface Cabin {
  _id: string;
  images: {
    _id?: string;
    imgURL: string;
    imgAlt?: string;
  }[];
  averageRating: number;
  location: {
    city: string;
    country: string;
  };
  description: string;
  pricePerNight: number;
  owner: {
    _id: string;
    name: {
      firstName: string;
      lastName: string;
    };
    image: {
      imgUrl: string;
    };
  };
  facilities: {
    beds: number;
    capacity: number;
    electricity: boolean;
    jacuzzi: boolean;
    petsAllowed: boolean;
    smokingAllowed: boolean;
    water: boolean;
    wifi: boolean;
  };
}

interface BookingFormProps {
  price: number;
  id: string;
  ownerFirst: string;
  ownerLast: string;
  ownerImg: string;
}

interface FacilitiesProps {
  beds: number;
  capacity: number;
  electricity: boolean;
  jacuzzi: boolean;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  water: boolean;
  wifi: boolean;
}

interface ImageCarouselProps {
  images: Cabin['images'];
}

export function RenderCabin() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cabin, setCabin] = useState<Cabin | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null); // User's selected rating
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No cabin ID provided");
      return;
    }

    const fetchCabin = async () => {
      try {
        const data = await fetchSingleCabin(id);
        setCabin(data);
      } catch (error) {
        console.error('Error fetching cabin:', error);
        setError("Failed to load cabin data");
      }
    };

    fetchCabin();
  }, [id]);

  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const userId: string = user.userId || "";

  const handleDelete = async () => {
    if (!cabin?._id) return;

    if (!window.confirm("Are you sure you want to delete this cabin?")) return;

    try {
      await deleteCabin(cabin._id);
      setNotification({ message: "Cabin deleted successfully!", type: "success" });
      setCabin(null);
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error('Error deleting cabin:', error);
      setNotification({ message: "Failed to delete cabin. Please try again.", type: "error" });
    }
  };

  const handleRatingChange = async (newRating: number) => {
    setUserRating(newRating);
    if (!id) return;

    try {
      await postRating(id, newRating);
      setNotification({ message: "Rating submitted successfully!", type: "success" });
      const updatedCabin = await fetchSingleCabin(id);
      setCabin(updatedCabin);
    } catch (error) {
      console.error('Error submitting rating:', error);
      setNotification({ message: "Failed to submit rating. Please try again.", type: "error" });
    } finally {
      setTimeout(() => setNotification(null), 2000); // Clear notification after 2 seconds
    }
  };

  return (
      <div className="w-screen flex justify-center pt-[120px] relative">
        {notification && (
            <div
                className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded shadow-lg text-white ${
                    notification.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
            >
              {notification.message}
            </div>
        )}
        {error ? (
            <p className="text-red-500">{error}</p>
        ) : cabin ? (
            <div className="flex gap-[61px] flex-col lg:flex-row">
              <div>
                <div className="flex lg:justify-between justify-center relative">
                  <ImageCarousel images={cabin.images} />
                  {userId && userId === cabin.owner._id && (
                      <div className="absolute top-100 right-0 flex gap-[8px]">
                        <Link to={`/cabin/edit/${cabin._id}`}>
                          <LiaPencilAltSolid className="cursor-pointer text-[#2D4B48]" />
                        </Link>
                        <LiaTrashAlt
                            onClick={handleDelete}
                            className="text-lg text-red-500 cursor-pointer"
                        />
                      </div>
                  )}
                </div>
                <div className="flex justify-between w-full lg:max-w-[580px] pt-[52px] items-center">
                  <h2 className="lg:text-[36px] text-[24px] font-semibold">
                    {cabin.location.city}, {cabin.location.country}
                  </h2>
                  <div className="flex flex-col items-end gap-2">
                    {userId && (
                        <RatingComponent
                            rating={userRating || 0}
                            onRatingChange={handleRatingChange}
                            className="mt-2"
                        />
                    )}
                  </div>
                </div>
                <p className="pt-[20px]">{cabin.description}</p>

                <Facilities
                    beds={cabin.facilities.beds}
                    capacity={cabin.facilities.capacity}
                    electricity={cabin.facilities.electricity}
                    jacuzzi={cabin.facilities.jacuzzi}
                    petsAllowed={cabin.facilities.petsAllowed}
                    smokingAllowed={cabin.facilities.smokingAllowed}
                    water={cabin.facilities.water}
                    wifi={cabin.facilities.wifi}
                />
              </div>
              <BookingForm
                  price={cabin.pricePerNight}
                  id={id as string}
                  ownerFirst={cabin.owner.name.firstName}
                  ownerLast={cabin.owner.name.lastName}
                  ownerImg={cabin.owner.image.imgUrl}
              />
            </div>
        ) : (
            <p>Loading...</p>
        )}
      </div>
  );
}