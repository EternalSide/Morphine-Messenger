"use client";

import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";
import clsx from "clsx";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";

interface ConversationListProps {
  conversations: FullConversationType[];
  users: User[];
  profile?: boolean;
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations, users, profile }) => {
  const [items, setItems] = useState(conversations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  let { conversationId, isOpen } = useConversation();
  const params = useParams();
  const session = useSession();
  if (params?.conversationsId) {
    isOpen = true;
  }

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) return;
    pusherClient.subscribe(pusherKey);
    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) return current;

        return [conversation, ...current];
      });
    };
    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };
    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((conv) => conv.id !== conversation.id)];
      });
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal users={users} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <aside
        className={clsx(
          `lg:block border-neutral-800 fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80  overflow-y-auto border-r border-l `,
          isOpen ? "hidden" : "block w-full left-0",
          profile ? "hidden" : "lg:block"
        )}
      >
        <div className="">
          <div className="flex justify-between mb-4 pt-4 px-5 ">
            <div className="text-xl font-bold text-white">Сообщения</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2  cursor-pointer hover:bg-gray-800 transition text-gray-300 "
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.length <= 0 && <h3 className="font-bold text-center text-gray-400">Сообщения отсутствуют.</h3>}

          {items.map((item) => {
            return <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />;
          })}
        </div>
      </aside>
    </>
  );
};
export default ConversationList;
