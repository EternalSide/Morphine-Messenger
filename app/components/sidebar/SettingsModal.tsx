"use client";

import Button from "../Button";
import Modal from "../Modal";
import Input from "../inputs/Input";
import { User } from "@prisma/client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}
const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post(`/api/settings`, data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Что-то не так"))
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Мой Профиль</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Редактировать данные</p>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input disabled={isLoading} label="Имя" id="name" errors={errors} required register={register} />
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Фото</label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    src={image || currentUser?.image || "/images/placeholder.jpg"}
                    width={48}
                    height={48}
                    alt="Фото в профиле"
                    className="rounded-full"
                  />
                  <CldUploadButton uploadPreset="tbm84y0e" onUpload={handleUpload} options={{ maxFiles: 1 }}>
                    <Button danger type="button" disabled={isLoading}>
                      Загрузить
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button secondary onClick={onClose} disabled={isLoading}>
              Отменить
            </Button>
            <Button type="submit" secondary onClick={onClose} disabled={isLoading}>
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
export default SettingsModal;
