"use client";

// import ConfirmModal from "./ConfirmModal";
import ConfirmModal from "./ConfirmModal";
import Avatar from "@/app/components/Avatar";
import Modal from "@/app/components/Modal";
import useOtherUser from "@/app/hooks/useOther";
// import AvatarGroup from "@/app/components/AvatarGroup";
// import useActiveList from "@/app/hooks/useActiveList";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
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
  const otherUser = useOtherUser(data);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);
  const statusText = useMemo(() => {
    if (data.isGroup) return `Участников: ${data.users.length}`;

    return "В сети";
  }, [data]);
  return (
    <>
      <ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen((prev) => !prev)} />

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog onClose={() => onClose()} as="div" className="relative z-50">
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
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-event-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div
                          className="flex
                      items-start justify-end
                      "
                        >
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              onClick={onClose}
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500
                          focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                              type="button"
                            >
                              <span className="sr-only">Закрыть панель</span>
                              <IoClose size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="">
                            <Avatar user={otherUser} />
                          </div>
                          {otherUser.email === "reidsgadv@gmail.com" && (
                            <>
                              <hr />
                              <div>
                                <dd className=" text-sm font-bold text-red-500 sm:col-span-2 ">
                                  Главный Администратор
                                </dd>
                              </div>
                            </>
                          )}
                          <div>{title}</div>
                          <div className="text-sm text-gray-500">{statusText}</div>

                          <div className="flex flex-col gap-1 my-8">
                            <div
                              className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75 z-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmOpen(true);
                              }}
                            >
                              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center cursor-pointer z-50">
                                <IoTrash size={20} className="cursor-pointer" />
                              </div>
                            </div>
                            <div className="text-sm font-light text-neutral-600">Удалить все сообщения</div>
                          </div>
                          <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                              {!data.isGroup && (
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                    Почта:{" "}
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{otherUser.email}</dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr />
                                  <div>
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                      Регистрация:
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                      <time dateTime={joinedDate}>{joinedDate}</time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
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
