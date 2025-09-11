// lib/access.ts
import { prisma } from "./prisma";

export type ProductKey = "productA" | "productB";

export function getPriceIdForKey(key: ProductKey) {
  if (key === "productA") return process.env.PRICE_ID_PRODUCT_A || null;
  if (key === "productB") return process.env.PRICE_ID_PRODUCT_B || null;
  return null;
}

function getAmountForKey(key: ProductKey): number {
  if (key === "productA")
    return parseInt(process.env.PRICE_AMOUNT_PRODUCT_A ?? "", 10) || 15599;
  if (key === "productB")
    return parseInt(process.env.PRICE_AMOUNT_PRODUCT_B ?? "", 10) || 9999;
  return 0;
}

export async function ensureProductsSeeded() {
  // Product A
  await prisma.product.upsert({
    where: { key: "productA" },
    create: {
      key: "productA",
      name: "Pack Formation Pro",
      priceId: process.env.PRICE_ID_PRODUCT_A!,
      amount: getAmountForKey("productA"),
    },
    update: {
      name: "Pack Formation Pro",
      priceId: process.env.PRICE_ID_PRODUCT_A!,
      amount: { set: getAmountForKey("productA") },
    },
  });

  // Product B
  await prisma.product.upsert({
    where: { key: "productB" },
    create: {
      key: "productB",
      name: "Pack Formation Starter",
      priceId: process.env.PRICE_ID_PRODUCT_B!,
      amount: getAmountForKey("productB"),
    },
    update: {
      name: "Pack Formation Starter",
      priceId: process.env.PRICE_ID_PRODUCT_B!,
      amount: { set: getAmountForKey("productB") },
    },
  });
}

export async function grantAccessForSession(params: {
  email: string;
  stripeSessionId: string;
  amountTotal: number;
  purchasedPriceId: string;
}) {
  const email = params.email.toLowerCase();
  const user = await prisma.user.upsert({
    where: { email },
    create: { email },
    update: {},
  });

  const product = await prisma.product.findFirst({ where: { priceId: params.purchasedPriceId } });
  if (!product) throw new Error("Produit introuvable pour le priceId donné");

  // Record order
  await prisma.order.create({
    data: {
      userId: user.id,
      productId: product.id,
      stripeSessionId: params.stripeSessionId,
      amount: params.amountTotal || product.amount,
    },
  });

  // Create or update purchase with active access
  await prisma.purchase.upsert({
    where: { userId_productId: { userId: user.id, productId: product.id } },
    create: { userId: user.id, productId: product.id, paidAt: new Date(), accessActive: true },
    update: { accessActive: { set: true }, paidAt: new Date() },
  });

  // Maintain legacy access table
  await prisma.access.upsert({
    where: { userId_productId: { userId: user.id, productId: product.id } },
    create: { userId: user.id, productId: product.id },
    update: {},
  });
}
