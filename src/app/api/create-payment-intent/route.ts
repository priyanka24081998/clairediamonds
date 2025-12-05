import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { amount } = await req.json(); // amount in paisa / cents

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd", // change to your currency
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
