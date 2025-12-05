"use client";

import { useRouter } from "next/router";
import { currencySymbol } from "@/lib/currencySymbol";

const Paymentpage = () => {
  const router = useRouter();
  const { total, currency } = router.query;

  return (
    <div className="py-10 container mx-auto px-4">
      <h1 className="text-3xl text-[#43825c] font-bold text-center mb-6">
        Checkout
      </h1>

      <div className="max-w-md mx-auto border p-6 rounded-lg shadow-sm bg-[#FAFAFA]">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{currency && total && currencySymbol[currency as string] || currency} {total}</span>
          </div>

          <div className="flex justify-between">
            <span>Express Delivery With Signature</span>
            <span>{currency && currencySymbol[currency as string] || currency} 0.00</span>
          </div>

          <div className="flex justify-between">
            <span>Estimated Tax</span>
            <span>-</span>
          </div>

          <div className="flex justify-between pt-3 border-t font-semibold text-gray-900">
            <span>Estimated Total</span>
            <span>{currency && total && currencySymbol[currency as string] || currency} {total}</span>
          </div>

          <button className="w-full mt-4 py-3 bg-[#0A6E6E] text-white font-semibold rounded-lg hover:bg-[#095c5c] transition-colors">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Paymentpage;
