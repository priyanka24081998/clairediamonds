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
    // ✅ Get API key from env
    const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
    if (!apiKey) throw new Error("Missing API key");

    // ✅ Use the base as `fromCurrency`
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.toUpperCase()}`;

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    console.log("Currency API response:", data); // Debug info

    if (data.result !== "success") {
      console.error("Currency API error:", data["error-type"]);
      return amount; // fallback
    }

    // ✅ Get conversion rate for the target currency
    const rate = data.conversion_rates[toCurrency.toUpperCase()];
    if (!rate) {
      console.error(`Currency code not found: ${toCurrency}`, data);
      return amount; // fallback
    }

    const converted = Number((amount * rate).toFixed(2));
    console.log(`${amount} ${fromCurrency} → ${converted} ${toCurrency} at rate ${rate}`);

    return converted;
  } catch (error) {
    console.error("Currency conversion error:", error);
    return amount; // fallback
  }
};


