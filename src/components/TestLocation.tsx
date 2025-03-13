'use client';

import { useEffect, useState } from 'react';
import { getLocation } from '@/lib/getLocation';

const TestLocation = () => {
  const [location, setLocation] = useState<{ country: string; currency: string } | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      const data = await getLocation();
      setLocation(data);
    }

    fetchLocation();
  }, []);

  return (
    <div>
      {location ? (
        <p>
          Country: {location.country}, Currency: {location.currency}
        </p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default TestLocation;
