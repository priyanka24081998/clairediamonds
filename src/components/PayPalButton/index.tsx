"use client";

import { useEffect } from "react";
import type { PaypalButtonsInstance, OrderResponse, PaypalActions } from "@/types/paypal";

interface PayPalButtonProps {
  amount: string;
  onSuccess: (details: OrderResponse) => void;
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: PaypalButtonsInstance) => { render: (selector: string) => void };
    };
  }
}

export default function PayPalButton({ amount, onSuccess }: PayPalButtonProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
    script.addEventListener("load", () => {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: (data: unknown, actions: PaypalActions) => {
            return actions.order.create({
              purchase_units: [{ amount: { value: amount } }],
            });
          },
          onApprove: async (data: unknown, actions: PaypalActions) => {
            const details = await actions.order.capture();
            onSuccess(details);
          },
          onError: (err: unknown) => {
            console.error("PayPal Checkout Error:", err);
          },
        }).render("#paypal-button-container");
      }
    });
    document.body.appendChild(script);
  }, [amount, onSuccess]);

  return <div id="paypal-button-container"></div>;
}
