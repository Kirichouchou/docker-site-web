/* eslint-disable */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Products
  const productA = await prisma.product.upsert({
    where: { key: "productA" },
    update: {},
    create: {
      key: "productA",
      name: "Pack Formation Pro",
      priceId: process.env.PRICE_ID_PRODUCT_A || "price_dummy_A",
      amount: parseInt(process.env.PRICE_AMOUNT_PRODUCT_A || "15599", 10),
      isActive: true,
    },
  });
  const productB = await prisma.product.upsert({
    where: { key: "productB" },
    update: {},
    create: {
      key: "productB",
      name: "Pack Formation Starter",
      priceId: process.env.PRICE_ID_PRODUCT_B || "price_dummy_B",
      amount: parseInt(process.env.PRICE_AMOUNT_PRODUCT_B || "9999", 10),
      isActive: true,
    },
  });

  // Users
  const adminPass = await bcrypt.hash("Admin123!", 10);
  const userPass = await bcrypt.hash("User1234!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: { role: "ADMIN", passwordHash: adminPass },
    create: { email: "admin@example.com", role: "ADMIN", passwordHash: adminPass },
  });
  const user1 = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: { passwordHash: userPass },
    create: { email: "alice@example.com", passwordHash: userPass },
  });
  const user2 = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: { passwordHash: userPass },
    create: { email: "bob@example.com", passwordHash: userPass },
  });

  // Purchases
  await prisma.purchase.upsert({
    where: { userId_productId: { userId: user1.id, productId: productA.id } },
    update: { accessActive: true },
    create: { userId: user1.id, productId: productA.id, paidAt: new Date(), accessActive: true },
  });
  await prisma.purchase.upsert({
    where: { userId_productId: { userId: user1.id, productId: productB.id } },
    update: { accessActive: false },
    create: { userId: user1.id, productId: productB.id, paidAt: new Date(), accessActive: false },
  });
  await prisma.purchase.upsert({
    where: { userId_productId: { userId: user2.id, productId: productB.id } },
    update: { accessActive: true },
    create: { userId: user2.id, productId: productB.id, paidAt: new Date(), accessActive: true },
  });

  // Legacy Access for compatibility
  await prisma.access.upsert({
    where: { userId_productId: { userId: user1.id, productId: productA.id } },
    update: {},
    create: { userId: user1.id, productId: productA.id },
  });
  await prisma.access.upsert({
    where: { userId_productId: { userId: user2.id, productId: productB.id } },
    update: {},
    create: { userId: user2.id, productId: productB.id },
  });

  console.log("Seed completed:\n- admin@example.com / Admin123!\n- alice@example.com / User1234!\n- bob@example.com / User1234!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
