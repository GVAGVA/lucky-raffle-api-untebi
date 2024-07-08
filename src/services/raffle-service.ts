import { Prize, User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "src/utils/prisma";

const DbDriver = process.env.DATABASE_DRIVER || "postgres";

const getAvailablePrizes = async (): Promise<Prize[]> => {
  const allPrizes = await prisma.prize.findMany({
    where: { winnerId: null },
    orderBy: { value: "asc" },
  });

  return allPrizes;
};

const getRandomUser = async () => {
  let randomUser: User;
  if (DbDriver === "postgres") {
    randomUser =
      await prisma.$queryRaw`SELECT * FROM "User" ORDER BY RANDOM() LIMIT 1`;
  } else {
    randomUser =
      await prisma.$queryRaw`SELECT * FROM "User" ORDER BY RAND() LIMIT 1`;
  }

  return randomUser[0];
};

const giveAwayHandler = async (_req: Request, res: Response) => {
  const allPrizes = await getAvailablePrizes();

  if (allPrizes.length === 0) {
    // All rpizes are won; reward user with a site balance increase
    res.status(400).json({
      message: "All prizes have been won, Incrementing site balance.",
    });
    return;
  }

  const allUsers = await prisma.user.findMany();
  if (!allUsers.length) {
    res.status(404).json({ message: "No users found!" });
    return;
  }

  // Checking the amount of available prizes and finished cycles
  const wonByAllUsers = await Promise.all(
    allUsers.map((user) => prisma.win.count({ where: { userId: user.id } }))
  );

  const minWins = Math.min(...wonByAllUsers);

  const eligibleUsers = allUsers.filter(
    (_user, index) => wonByAllUsers[index] === minWins
  );

  let selectedUser: User;
  console.log(eligibleUsers);
  if (eligibleUsers.length === 1) {
    selectedUser = eligibleUsers[0];
  } else if (minWins === 0) {
    selectedUser = await getRandomUser();
  } else {
    // Resolving the by selecting the user who last won the cheapest prize
    const lowestWin = await prisma.win.findFirst({
      orderBy: { winValue: "asc" },
      include: { user: true },
    });
    if (!lowestWin) {
      selectedUser = await getRandomUser();
    } else {
      selectedUser = lowestWin.user;
    }
  }

  const prizeToAward = allPrizes[0]; // Cheapest available prize

  try {
    const win = await prisma.$transaction(async (prisma) => {
      // Awarding the prize
      await prisma.prize.update({
        where: { id: prizeToAward.id },
        data: { winnerId: selectedUser.id },
      });

      // Recording the win
      const win = await prisma.win.create({
        data: {
          userId: selectedUser.id,
          prizeId: prizeToAward.id,
          winValue: prizeToAward.value,
        },
      });

      return win;
    });

    res.json(win);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

export { giveAwayHandler };
