import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // --- Clear existing data (optional while testing) ---
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  // --- Create users with tasks ---
  const user1 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      tasks: {
        create: [
          {
            title: "Finish project report",
            description: "Compile final results and submit",
            priority: "high",
            dueDate: new Date("2025-11-05"),
          },
          {
            title: "Team meeting",
            description: "Discuss project updates",
            priority: "medium",
            dueDate: new Date("2025-11-03"),
          },
        ],
      },
    },
    include: { tasks: true },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "bob@example.com",
      tasks: {
        create: [
          {
            title: "Buy groceries",
            priority: "low",
          },
          {
            title: "Call electrician",
            description: "Fix kitchen light",
            priority: "medium",
          },
        ],
      },
    },
    include: { tasks: true },
  });

  console.log("Seed complete ✅");
  console.log({ user1, user2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
