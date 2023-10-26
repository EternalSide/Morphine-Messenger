"use client";

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import useConversation from "@/app/hooks/useConversation";
import {Dialog} from "@headlessui/react";
import axios from "axios";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import {toast} from "react-hot-toast";
import {FiAlertTriangle} from "react-icons/fi";

interface ConfirmModalProps {
	isOpen?: boolean;
	onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({isOpen, onClose}) => {
	const router = useRouter();
	const {conversationId} = useConversation();
	const [isLoading, setIsLoading] = useState(false);

	const session = useSession();

	const testAccount = session?.data?.user?.email === "Test@test.com";

	const onDelete = useCallback(() => {
		setIsLoading(true);
		axios
			.delete(`/api/conversations/${conversationId}`)
			.then(() => {
				onClose();
				router.push("/conversations");
				router.refresh();
			})
			.catch(() => toast.error("Something Went Wrong"))
			.finally(() => setIsLoading(false));
	}, [conversationId, router, onClose]);
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className='sm:flex sm:items-start pt-6 sm:pt-0'>
				<div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10'>
					<FiAlertTriangle className='h-6 w-6 text-red-400' />
				</div>
				<div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
					<Dialog.Title
						as='h3'
						className='text-base font-semibold leading-6 '
					>
						Удалить диалог
					</Dialog.Title>
					<div className='mt-2 '>
						{!testAccount && (
							<p className='text-sm text-zinc-200'>Вы уверены, что хотите удалить все сообщения?</p>
						)}
						{testAccount && (
							<p className='text-sm text-red-400 mt-2 '>
								Вы используете тестовый аккаунт, удаление сообщений невозможно.
							</p>
						)}
					</div>
				</div>
			</div>

			<div className='flex items-center justify-center sm:justify-end gap-x-3 mt-5 sm:mt-4'>
				{!testAccount && (
					<Button
						disabled={isLoading}
						danger
						onClick={onDelete}
					>
						Удалить
					</Button>
				)}
				<Button
					disabled={isLoading}
					secondary
					onClick={onClose}
				>
					Отменить
				</Button>
			</div>
		</Modal>
	);
};
export default ConfirmModal;
