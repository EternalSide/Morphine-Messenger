import getSession from "./getSession";
import prisma from "@/app/libs/prismadb";

// Список всех пользователь без того, кто зашел в аккаунт
const getUsers = async () => {
  const session = await getSession();
  if (!session?.currentUser?.email) return [];
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.currentUser.email,
        },
      },
    });
    return users;
  } catch (error: any) {
    return [];
  }
};
export default getUsers;
