"use client";

import useActiveList from "../hooks/useActiveList";
import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user?: User;
  onClick?: () => void;
}
const Avatar: React.FC<AvatarProps> = ({ user, onClick }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className="relative" onClick={onClick}>
      <div className="relative inline-block rounded-full overflow-hidden h-[50px] w-[50px] md:h-11 md:w-11">
        <Image
          className="hover:opacity-90 transition cursor-pointer"
          fill
          src={user?.image || "/images/placeholder.jpg"}
          alt="Аватар"
        />
      </div>
      {isActive && (
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
      )}
    </div>
  );
};
export default Avatar;
