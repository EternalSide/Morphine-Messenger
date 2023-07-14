"use client";

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import useOtherUser from "@/app/hooks/useOther";
import { FullConversationType } from "@/app/types";
import { Conversation, Message, User } from "@prisma/client";
import clsx from "clsx";
import format from "date-fns/format";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}
const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
  const otherUser = useOtherUser(data);

  const session = useSession();
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];

    if (!userEmail) return false;

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "Отправил Изображение";

    if (lastMessage?.body) return lastMessage.body;
    return "Диалог создан, отправьте свое первое сообщение";
  }, [lastMessage]);
  return (
    <div
      onClick={handleClick}
      className={clsx(
        ` border-b-[1px] border-neutral-800 pt-5 pb-5 pl-3 pr-3 md:p-3 w-full relative
    flex items-center space-x-3 hover:bg-gray-900 transition cursor-pointer`,
        selected ? "bg-neutral-800" : "",
        hasSeen ? "" : "bg-neutral-900"
      )}
    >
      {data.isGroup ? <AvatarGroup users={data.users} /> : <Avatar user={otherUser} />}
      <div className="min-w-0 flex-1  ">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-white">{data.name || otherUser?.name}</p>
            {lastMessage?.createdAt && (
              <p className={clsx(`text-xs text-gray-500 font-light`, hasSeen ? "" : "font-bold")}>
                {format(new Date(lastMessage.createdAt), "HH:mm")}
              </p>
            )}
          </div>
          <p className="truncate text-sm text-gray-500">{lastMessageText}</p>
        </div>
      </div>
    </div>
  );
};
export default ConversationBox;
