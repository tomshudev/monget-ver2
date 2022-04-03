import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const client = await prisma.user.create({
    data: {
      email: "tomshudev@gmail.com",
      name: 'tom'
    },
  });

  await prisma.expense.create({
    data: {
      userId: client.id,
      category: "RENT",
      expense: 2600,
      storeName: "יוסף",
      date: new Date(),
      description: "שכר דירה לחודש פברואר",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
