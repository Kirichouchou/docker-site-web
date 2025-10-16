import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { grantAccessForSession } from "../../../../lib/access";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Webhook non configuré" }, { status: 400 });
  }

  const buf = await req.arrayBuffer();
  const text = Buffer.from(buf).toString("utf8");

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(text, sig, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Signature invalide: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    try {
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items", "payment_intent"],
      });
      const email: string | undefined = fullSession.customer_details?.email || fullSession.customer_email || undefined;
      const amountTotal: number = fullSession.amount_total || 0;
      const purchasedPriceId: string | undefined = fullSession.line_items?.data?.[0]?.price?.id;

      if (!email || !purchasedPriceId) {
        return NextResponse.json({ received: true, info: "Email ou priceId manquant" });
      }

      await grantAccessForSession({
        email,
        stripeSessionId: session.id,
        amountTotal,
        purchasedPriceId,
      });
    } catch (err) {
      // Log and continue to acknowledge to Stripe
      console.error("Webhook error:", err);
    }
  }

  return NextResponse.json({ received: true });
}

