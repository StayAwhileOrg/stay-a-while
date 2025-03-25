import { API_CABIN } from '../../../utility/constants.tsx';

export async function fetchSingleCabin(id: string) {
  try {
    const url = `${API_CABIN}${id}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    console.log('Fetched cabin:', data);
    return data.data;
  } catch (error) {
    console.error('Error fetching single cabin:', error);
    throw error;
  }
}
