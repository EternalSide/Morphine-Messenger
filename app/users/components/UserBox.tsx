"use client";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
  data: User;
}
const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3  p-3 pl-6 hover:bg-gray-900  transition cursor-pointer"
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1 ">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-lg font-medium text-white">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserBox;
