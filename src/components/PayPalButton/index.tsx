"use client";

import { useEffect, useRef } from "react";
import type { OrderResponse, PaypalActions, PaypalButtonsInstance } from "@/types/paypal";

interface PayPalButtonProps {
  amount: string;
  onSuccess: (details: OrderResponse) => void;
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: PaypalButtonsInstance) => { render: (container: HTMLElement) => void };
    };
  }
}

export default function PayPalButton({ amount, onSuccess }: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Load PayPal SDK once
  useEffect(() => {
    if (!document.getElementById("paypal-sdk")) {
      const script = document.createElement("script");
      script.id = "paypal-sdk";
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Render PayPal button
  useEffect(() => {
    if (!window.paypal || !containerRef.current) return;

    containerRef.current.innerHTML = ""; // clear old buttons

    window.paypal.Buttons({
      createOrder: (data, actions: PaypalActions) => {
        return actions.order.create({
          purchase_units: [{ amount: { value: amount } }],
        });
      },
      onApprove: async (data, actions: PaypalActions) => {
        const details = await actions.order.capture();
        onSuccess(details);
      },
      onError: (err) => console.error("PayPal Error:", err),
      style: {
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "paypal",
      },
    }).render(containerRef.current);
  }, [amount, onSuccess]);

  return <div ref={containerRef}></div>;
}
