import { API_BASE } from '../../../utility/constants.tsx';

type Cabin = {
  _id: string;
  title: string;
  pricePerNight: number;
  averageRating: number;
  location: {
    city: string;
    country: string;
  };
  images: {
    imgURL: string;
    imgAlt?: string;
  }[];
  facilities: {
    beds: number;
    smokingAllowed: boolean;
    petsAllowed: boolean;
    wifi: boolean;
    electricity: boolean;
  };
};

type Pagination = {
  totalPages: number;
};

export async function getCabins(
    params?: Record<string, string>
): Promise<{ cabins: Cabin[]; pagination: Pagination }> {
  try {
    const searchParams = new URLSearchParams(params).toString();
    const res: Response = await fetch(`${API_BASE}/cabin?${searchParams}`);
    const data = await res.json();
    console.log(data);
    return { cabins: data.data, pagination: data.pagination };
  } catch (error) {
    console.error('There was an error fetching cabins', error);
    throw error;
  }
}
