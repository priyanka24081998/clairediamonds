// "use client";

import React, { useState, useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PaymentForm = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({ amount: amount * 100 }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [amount]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            }
        );

        if (error) {
            alert(error.message);
        } else if (paymentIntent?.status === "succeeded") {
            alert("Stripe Payment Successful!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement className="border p-3 rounded-md" />
            <button className="mt-4 bg-black text-white px-4 py-2 rounded">
                Pay with Card
            </button>
        </form>
    );
};

const Paymentpage = () => {
    const amount = 100; // example

    return (
        <div className="p-6 max-w-lg mx-auto space-y-10">
            <h2 className="text-2xl font-bold">Complete Your Payment</h2>

            {/* Stripe Section */}
            <div className="p-4 border rounded-lg shadow">
                <h3 className="font-semibold mb-3">Pay with Credit / Debit Card</h3>

                <Elements stripe={stripePromise}>
                    <PaymentForm amount={amount} />
                </Elements>
            </div>

            {/* PayPal Section */}
            <div className="p-4 border rounded-lg shadow">
                <h3 className="font-semibold mb-3">Pay with PayPal</h3>

                <PayPalScriptProvider
                    options={{
                        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                    }}
                >
                    <PayPalButtons
                        createOrder={(data, actions) =>
                            actions.order.create({
                                intent: "CAPTURE",
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: "USD",
                                            value: amount.toString(),
                                        },
                                    },
                                ],
                            })
                        }
                        onApprove={(data, actions) =>
                            actions.order!.capture().then(() => {
                                alert("PayPal Payment Successful!");
                            })
                        }
                    />
                </PayPalScriptProvider>
            </div>
        </div>
    );
};

export default Paymentpage;
