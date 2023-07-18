import AuthForm from "./components/AuthForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // Если в системе сразу в профиль

  const user = await getServerSession();

  if (user?.user?.email) redirect(`/conversations`);

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-4 text-center text-3xl font-bold tracking-tight text-white">
        <h1 className="mb-3">Morphine 0.1.0</h1>
        <h2 className="mb-6">Войдите в свой аккаунт</h2>
      </div>
      <AuthForm />
    </div>
  );
}
