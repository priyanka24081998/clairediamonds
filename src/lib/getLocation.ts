import { currencyCodeMap } from "./currencyCodeMap ";

export const getLocation = async () => {
  try {
    const res = await fetch(
      `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`
    );

    const data = await res.json();
    const countryCode = data.country; // e.g. "IN"

    return {
      country: countryCode,
      currency: currencyCodeMap[countryCode] || "USD"
    };
  } catch (err) {
    console.error("Location Error:", err);
    return {
      country: "US",
      currency: "USD"
    };
  }
};
