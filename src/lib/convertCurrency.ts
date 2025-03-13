export const convertCurrency = async (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<number> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
      if (!apiKey) throw new Error('Missing API key');
  
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`
      );
  
      if (!res.ok) throw new Error('Failed to fetch exchange rates');
      
      const data = await res.json();
  
      const rate = data.conversion_rates[toCurrency];
      if (!rate) throw new Error('Invalid currency code');
  
      return amount * rate;
    } catch (error) {
      console.error('Currency conversion error:', error);
      return amount; // Return original amount if conversion fails
    }
  };
  