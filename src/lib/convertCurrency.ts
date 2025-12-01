// export const convertCurrency = async (
//   amount: number,
//   fromCurrency: string,
//   toCurrency: string
// ): Promise<number> => {
//   try {
//     const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
//     if (!apiKey) throw new Error("Missing API key");

//     const res = await fetch(
//       `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`
//     );

//     if (!res.ok) throw new Error("Failed to fetch exchange rates");

//     const data = await res.json();
//     return data.conversion_result; // Accurate final value
//   } catch (error) {
//     console.error("Currency conversion error:", error);
//     return amount;
//   }
// };

export const convertCurrency = async (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
    if (!apiKey) throw new Error("Missing API key");

const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    // Debug API response
    console.log("Currency API data:", data);

    const rate = data?.conversion_rates?.[toCurrency];

    if (!rate) {
      console.error(`Currency code not found or API error for ${toCurrency}`, data);
      return amount; // fallback
    }

    return Number((amount * rate).toFixed(2));
  } catch (error) {
    console.error("Currency conversion error:", error);
    return amount; // fallback
  }
};

