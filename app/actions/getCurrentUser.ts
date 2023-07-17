import getSession from "./getSession";
import prisma from "@/app/libs/prismadb";

// Доп проверка на юзера,
// возвращает все данные пользователя
const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.currentUser?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.currentUser.email as string,
      },
    });
    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
