import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { total } = await req.json();

    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET!;
    const PAYPAL_API = "https://api-m.sandbox.paypal.com";

    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");

    // GET ACCESS TOKEN
    const tokenRes = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // CREATE ORDER
    const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: total,
            },
          },
        ],
        application_context: {
          return_url: "https://yourwebsite.com/payment-success",
          cancel_url: "https://yourwebsite.com/payment-cancel",
        },
      }),
    });

    const order = await orderRes.json();
    return NextResponse.json(order);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: true });
  }
}
