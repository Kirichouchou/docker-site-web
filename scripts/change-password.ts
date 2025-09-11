// scripts/change-password.ts
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage: npx ts-node scripts/change-password.ts <email> <newPassword>");
    process.exit(1);
  }

  const [email, newPassword] = args;
  const passwordHash = await hash(newPassword, 10);

  // ⚠️ nécessite que `email` soit @unique (ce qui est le cas dans ton schéma)
  const user = await prisma.user.update({
    where: { email },
    data: { passwordHash },
    select: { email: true }, // aide TypeScript et limite le retour
  });

  console.log(`✅ Mot de passe changé pour ${user.email}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error("❌ Échec :", err);
    prisma.$disconnect();
    process.exit(1);
  });
