import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { getAuthSession } from "../../../../lib/auth-session";
import { getPriceIdForKey, ensureProductsSeeded } from "../../../../lib/access";
import { logger } from "../../../../lib/logger";

export async function POST(req: NextRequest) {
  try {
    const sessionAuth = await getAuthSession();
    const body = await req.json();
    const productKey = body?.productKey as "productA" | "productB";
    if (!productKey) {
      return NextResponse.json({ error: "productKey manquant" }, { status: 400 });
    }

    const origin =
      req.headers.get("origin") ||
      process.env.NEXTAUTH_URL ||
      "http://localhost:3000";

    const price = getPriceIdForKey(productKey);
    if (!price) {
      return NextResponse.json({ error: "PRICE_ID non configuré" }, { status: 400 });
    }

    await ensureProductsSeeded();

    const successUrl = sessionAuth?.user?.email
      ? `${origin}/formation`
      : `${origin}/login?from=success`;
    const cancelUrl = `${origin}/#produits`;

    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: sessionAuth?.user?.email || undefined,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: checkout.url });
  } catch (err: any) {
    logger.error("Erreur lors de la création de la session checkout", err);
    return NextResponse.json(
      { error: err?.message || "Erreur" },
      { status: 500 }
    );
  }
}
