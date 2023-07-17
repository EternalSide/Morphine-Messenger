import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// getServerSession возращает только имя и почту
// А нам нужны все данные пользователя
// поэтому найдем его в базе
const serverAuth = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser };
};

export default serverAuth;
