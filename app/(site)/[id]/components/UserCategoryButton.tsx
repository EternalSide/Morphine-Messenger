"use client";

import { usePathname } from "next/dist/client/components/navigation";
import { useRouter } from "next/navigation";

interface UserButtonProps {
  title: string;
  id: string;
  userId: string;
  main?: boolean;
}

const UserButton: React.FC<UserButtonProps> = ({ title, id, userId, main }) => {
  const router = useRouter();
  const pathname = usePathname();
  const truePathName = pathname?.slice(1);
  const active = pathname?.includes(id);
  const mediaButton = truePathName === userId;

  if (main) {
    return (
      <button
        onClick={() => router.push(`/${userId}`)}
        className="flex flex-col items-center pt-3 w-32 h-12 hover:bg-neutral-800 cursor-pointer font-semibold text-neutral-400"
      >
        {title}
        {mediaButton && <div className="border-b-[4px] border-sky-500 mt-2 w-20 "></div>}
      </button>
    );
  }

  return (
    <button className="flex flex-col items-center pt-3 w-32 h-12 hover:bg-neutral-800 cursor-pointer font-semibold text-neutral-400">
      {title}
      {active && <div className="border-b-[4px] border-sky-500 mt-2 w-20 "></div>}
    </button>
  );
};
export default UserButton;
