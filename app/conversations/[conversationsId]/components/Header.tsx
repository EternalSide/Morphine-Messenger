"use client";

import ProfileDrawer from "./ProfileDrawer";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";
import useOtherUser from "@/app/hooks/useOther";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "В сети" : "Заходил недавно";
  }, [conversation]);
  return (
    <>
      <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="bg-black w-full flex border-b-[1px] border-neutral-800 sm:px-4 py-3 px-4 lg:px-6 justify-between items-center ">
        <div className="flex gap-3 items-center">
          <Link className="lg:hidden block text-blue-500 hover:text-blue-400 transition cursor-pointer" href="/conversations">
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? <AvatarGroup users={conversation.users} /> : <Avatar user={otherUser} />}
          <div className="flex flex-col text-white">
            <div>{conversation.name || otherUser?.name}</div>
            <div className="text-sm font-light text-neutral-500">{statusText}</div>
          </div>
        </div>
        <HiEllipsisHorizontal
          className="text-blue-500 hover:text-blue-400 cursor-pointer"
          size={32}
          onClick={() => setDrawerOpen(true)}
        />
      </div>
    </>
  );
};
export default Header;
