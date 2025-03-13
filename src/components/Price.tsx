import { useEffect, useState } from 'react';
import { convertCurrency } from '@/lib/convertCurrency';

interface PriceProps {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}

const Price: React.FC<PriceProps> = ({ amount, fromCurrency, toCurrency }) => {
  const [convertedPrice, setConvertedPrice] = useState<number | null>(null);

  useEffect(() => {
    async function convert() {
      const result = await convertCurrency(amount, fromCurrency, toCurrency);
      setConvertedPrice(result);
    }

    convert();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      {convertedPrice !== null
        ? `${convertedPrice.toFixed(2)} ${toCurrency}`
        : 'Loading...'}
    </div>
  );
};

export default Price;

// for the usage in the component to show price conversion


{/* <Price amount={100} fromCurrency="USD" toCurrency="INR" /> */}

