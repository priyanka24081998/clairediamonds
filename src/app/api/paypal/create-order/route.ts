// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { total } = await req.json();

//     console.log("🟡 DEBUG — Incoming total:", total);
//     const totalInUSD = Number(total).toFixed(2);
//     const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
//     const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

//     if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
//       console.error("❌ ENV ERROR: Missing PayPal credentials.");
//       return NextResponse.json({
//         error: true,
//         message: "Missing PayPal environment variables",
//       });
//     }

//     const PAYPAL_API = "https://api-m.sandbox.paypal.com"; // keep sandbox while testing

//     const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString(
//       "base64"
//     );

//     console.log("🟡 DEBUG — Requesting access token...");

//     // 1️⃣ GET ACCESS TOKEN
//     const tokenRes = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${auth}`,
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: "grant_type=client_credentials",
//     });

//     const tokenData = await tokenRes.json();
//     console.log("🟡 DEBUG — Token Response:", tokenData);

//     if (!tokenData.access_token) {
//       console.error("❌ FAILED to get PayPal access token.");
//       return NextResponse.json({
//         error: true,
//         message: "Failed to obtain PayPal access token",
//         tokenData,
//       });
//     }

//     const accessToken = tokenData.access_token;

//     console.log(
//       "🟢 DEBUG — Access Token received:",
//       accessToken.substring(0, 10),
//       "..."
//     );

//     // 2️⃣ CREATE THE PAYPAL ORDER
//     console.log("🟡 DEBUG — Creating PayPal order...");

//     const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         intent: "CAPTURE",
//         purchase_units: [
//           {
//             amount: {
//               currency_code: "USD",
//               value: totalInUSD,
//             },
//           },
//         ],
//         application_context: {
//           return_url: "https://www.clairediamonds.com/payment-success",
//           cancel_url: "https://www.clairediamonds.com/payment-cancel",
//         },
//       }),
//     });

//     const order = await orderRes.json();
//     console.log("🟡 DEBUG — Order Response:", order);

//     if (!order.id) {
//       console.error("❌ PayPal order creation FAILED.");
//       return NextResponse.json({
//         error: true,
//         message: "Failed to create PayPal order",
//         order,
//       });
//     }

//     console.log("🟢 DEBUG — PayPal Order Created:", order.id);

//     return NextResponse.json(order);
//   } catch (err) {
//     console.error("🔥 Internal Server Error:", err);
//     return NextResponse.json({
//       error: true,
//       message: "Internal Server Error",
//     });
//   }
// }

import { NextResponse } from "next/server";

type CartProduct = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  metal: string;
  size: string;
};

type ShippingInfo = {
  name: string;
  address: string;
  pincode: string;
  phone: string;
  email: string;
};

export async function POST(req: Request) {
  try {
    const {
      products,
      total,
      shipping,
    }: { products: CartProduct[]; total: number; shipping: ShippingInfo } = await req.json();

    if (!products || products.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    if (!shipping) {
      return NextResponse.json({ error: "Shipping info missing" }, { status: 400 });
    }

    const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
    const SECRET = process.env.PAYPAL_SECRET!;
    const PAYPAL_API = "https://api-m.sandbox.paypal.com";

    const auth = Buffer.from(`${CLIENT_ID}:${SECRET}`).toString("base64");

    // 1️⃣ Get PayPal Access Token
    const tokenRes = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      throw new Error("Failed to get PayPal access token: " + errText);
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2️⃣ Convert cart items to PayPal Items
    const items = products.map((p) => ({
      name: p.name,
      unit_amount: { currency_code: "USD", value: p.price.toFixed(2) },
      quantity: p.quantity.toString(),
      sku: `${p._id}|${p.metal}|${p.size}`,
    }));

    // 3️⃣ Create PayPal Order
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
              value: total.toFixed(2),
              breakdown: {
                item_total: { currency_code: "USD", value: total.toFixed(2) },
              },
            },
            items,
          },
        ],
        application_context: {
          brand_name: "Clairediamonds",
          landing_page: "LOGIN",
          user_action: "PAY_NOW",
          return_url: "https://www.clairediamonds.com/payment-success",
          cancel_url: "https://www.clairediamonds.com/payment-cancel",
        },
      }),
    });

    if (!orderRes.ok) {
      const errText = await orderRes.text();
      throw new Error("Failed to create PayPal order: " + errText);
    }

    const order = await orderRes.json();

    // 4️⃣ Return order + shipping info to frontend
    return NextResponse.json({
      ...order,
      shipping, // IMPORTANT: return this so success page can save order
    });
  } catch (error: unknown) {
    console.error("Error in creating PayPal order:", error);
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
