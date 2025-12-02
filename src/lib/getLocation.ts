// lib/getLocation.ts
export interface LocationInfo {
  country: string;
  currency: string;
}

export const getLocation = async (): Promise<LocationInfo | null> => {
  try {
    const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;

    const res = await fetch(`https://ipinfo.io/json?token=${token}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch location");

    const data = await res.json();
    console.log("IPInfo Data:", data);

    const countryCode = data.country; // IN, US, GB, AE etc.

    if (!countryCode) return null;

    // Convert country code → full name (IN → India)
    const countryName = new Intl.DisplayNames(["en"], {
      type: "region",
    }).of(countryCode);

    return {
      country: countryName || "Unknown",
      currency: "USD",
    };
  } catch (error) {
    console.error("Location error:", error);
    return null;
  }
};
