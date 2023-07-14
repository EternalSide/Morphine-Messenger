import AuthForm from "./components/AuthForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // Если в системе сразу в диалоги
  const session = await getServerSession();
  if (session?.user?.name) redirect("/users");
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-black">
      <div
        className="sm:mx-auto sm:w-full sm:max-w-md bg-neutral
      -900"
      >
        <h1 className="mt-2 text-center text-3xl font-bold tracking-tight text-white mb-3">Morphine 0.1.0</h1>
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-white mb-6">Войдите в свой аккаунт</h2>
      </div>
      <AuthForm />
    </div>
  );
}
