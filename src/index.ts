import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  try {
    const documentType = await prisma.documentType.findMany();
    console.table(documentType);
    const User = await prisma.user.findMany();
    console.table(User);
    const Target = await prisma.target.findMany();
    console.table(Target);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
main();
