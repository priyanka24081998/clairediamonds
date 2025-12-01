export interface LocationInfo {
  country: string;
  currency: string;
}

export const getLocation = async (): Promise<LocationInfo | null> => {
  try {
    const res = await fetch('https://ipapi.co/json/'); // Use a working IP location service
    if (!res.ok) throw new Error('Failed to fetch location');

    const data = await res.json();

    console.log('Fetched Location Data:', data); // ✅ Debugging Output

    return {
      country: data.country_name,
      currency: data.currency
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    return null; // Return null if fetching fails
  }
};
