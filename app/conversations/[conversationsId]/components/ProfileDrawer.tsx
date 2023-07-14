"use client";

import ConfirmModal from "./ConfirmModal";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";
import useOther from "@/app/hooks/useOther";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Fragment, useMemo, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose, data }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const otherUser = useOther(data);
  console.log(otherUser);
  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP", { locale: ru });
  }, [otherUser?.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser?.name]);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [data, isActive]);

  return (
    <>
      <ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden ">
            <div className="absolute inset-0 overflow-hidden ">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-black py-6 shadow-xl border-l border-neutral-900">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-black text-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={onClose}
                            >
                              <span className="sr-only">Закрыть</span>
                              <IoClose size={24} aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 ">
                        <div className="flex flex-col items-center mb-2">
                          {data.isGroup ? <AvatarGroup users={data.users} /> : <Avatar user={otherUser} />}
                          <p>{title}</p>
                          <div className="text-sm text-gray-500 mb-3 border-b-[1px] border-gray-800 w-full text-center pb-3">
                            {statusText}
                          </div>

                          <div className="w-full pb-5 sm:px-0 sm:pt-0">
                            <div>
                              {data.isGroup && (
                                <div
                                  className="flex
                                  flex-col text-center
                                items-center justify-center"
                                >
                                  <div
                                    className="
                                    
                                  text-sm 
                                  font-medium 
                                  text-white
                                  sm:w-40 
                                 
                                "
                                  >
                                    Участники
                                  </div>
                                  <div
                                    className="
                                  mt-1 
                                  text-sm 
                                  text-white
                                  sm:col-span-2
                                "
                                  >
                                    {data.users.map((user) => user.name).join(", ")}
                                  </div>
                                </div>
                              )}

                              {!data.isGroup && (
                                <>
                                  <div
                                    className="flex flex-col items-center justify-center gap-1 text-sm font-medium text-white sm:w-full  border-b-[1px] border-gray-800 pb-3
                                  "
                                  >
                                    <p> Регистрация</p>
                                    <p>{joinedDate}</p>
                                  </div>
                                </>
                              )}

                              <div
                                onClick={() => setConfirmOpen(true)}
                                className="flex flex-col justify-center gap-1  mt-3 items-center sm:mt-3"
                              >
                                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                                  <IoTrash size={20} className="hover:opacity-75 cursor-pointer" />
                                </div>
                                <p className="text-sm font-light text-white">Удалить все сообщения</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
