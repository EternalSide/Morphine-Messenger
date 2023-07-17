"use client";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

interface UserBoxProps {
  user: User;
}
const UserBox: React.FC<UserBoxProps> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const pathName = usePathname();
  const userId = pathName?.slice(1);

  const activeProfile = userId === user.id;

  const handleClick = useCallback(() => {
    router.push(`/${user.id}`);
  }, [user, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className={clsx(
          `w-full relative flex items-center space-x-3  p-3 pl-6 hover:bg-gray-900  transition cursor-pointer`,
          activeProfile ? "bg-gray-900" : "bg-bgray-900"
        )}
      >
        <Avatar user={user} />
        <div className="min-w-0 flex-1 ">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-lg font-medium text-white">{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserBox;
