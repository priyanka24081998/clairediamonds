// lib/getLocation.ts
export interface LocationInfo {
  country: string;
  currency: string;
}

export const getLocation = async (): Promise<LocationInfo | null> => {
  try {
    // Use your IPInfo token from .env
    const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
    if (!token) throw new Error("IPInfo token missing");

    // Client-side fetch
    const res = await fetch(`https://ipinfo.io/json?token=${token}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch location");

    const data = await res.json();
    // data.country is ISO code like "IN", "US"
    const countryCode = data.country;

    if (!countryCode) return null;

    // Convert ISO code → full country name
    const countryName =
      new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode) ||
      "Unknown";

    return {
      country: countryName,
      currency: "USD", // fallback, actual currency mapping done outside
    };
  } catch (err) {
    console.error("Location fetch error:", err);
    return null;
  }
};
