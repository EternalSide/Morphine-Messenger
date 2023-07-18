"use client";

import UserCategoryButton from "./UserCategoryButton";
import UserHeaderButton from "./UserHeaderButton";
import SettingsModal from "@/app/components/sidebar/SettingsModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";

interface UserHeaderProps {
  user: User;
  isOwnProfile: boolean;
}
const UserHeader: React.FC<UserHeaderProps> = ({ user, isOwnProfile }) => {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const goToMessages = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        userId: user.id,
      })
      .then((user) => {
        router.push(`/conversations/${user.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [user, router]);

  return (
    <>
      <SettingsModal currentUser={user} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="p-8 pb-0 relative border-[1px] border-neutral-800 w-full">
        {/* Header */}
        <div className="flex flex-col lg:flex-row md:flex-row  lg:items-center  justify-between">
          <div className="flex gap-x-6">
            <div className="w-44 ">
              <img
                src={user.image! || "/images/placeholder.jpg"}
                className="h-44 w-44 rounded-md absolute -top-12 -left-50"
                alt="Фото профиля"
              />
            </div>
            <div className="flex flex-col mt-3">
              <div className="flex items-center gap-x-1">
                <h2 className="text-white font-bold text-3xl">{user.name}</h2>
                {user?.userName && <p className="text-gray-400 font-semibold mt-2">@{user?.userName}</p>}
              </div>

              <p className="">{user.bio || "Информация отсуствует"}</p>
              <div className="flex gap-x-2 items-center">
                <p className="text-gray-400">Подписки скрыты</p>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="flex flex-col  gap-y-2">
            <div className="flex gap-x-4">
              {isOwnProfile ? (
                <UserHeaderButton title="Редактировать" onClick={() => setIsOpen(true)} />
              ) : (
                <UserHeaderButton title="Сообщение" onClick={goToMessages} />
              )}
            </div>
          </div>
        </div>
        <div className="flex mt-8">
          <UserCategoryButton title="Медиа" main id="/" userId={user.id} />
          <UserCategoryButton title="Посты" id="posts" userId={user.id} />
          <UserCategoryButton title="Нравится" id="liked" userId={user.id} />
        </div>
      </div>
    </>
  );
};
export default UserHeader;
