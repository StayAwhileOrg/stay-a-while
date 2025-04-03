import { API_BASE } from '../../../utility/constants.tsx';

export interface Cabin {
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
    capacity: number;
    beds: number;
    smokingAllowed: boolean;
    petsAllowed: boolean;
    wifi: boolean;
    electricity: boolean;
    water: boolean;
    jacuzzi: boolean;
  };
}

type Pagination = {
  totalPages: number;
};

export async function getCabins(
    params?: Record<string, string>
): Promise<{ cabins: Cabin[]; pagination: Pagination }> {
  try {
    const searchParams = params ? new URLSearchParams(params).toString() : "";
    const res: Response = await fetch(`${API_BASE}/cabin?${searchParams}`);
    const data = await res.json();
    return {
      cabins: data.data as Cabin[],
      pagination: data.pagination,
    };
  } catch (error) {
    console.error('There was an error fetching cabins', error);
    throw error;
  }
}
