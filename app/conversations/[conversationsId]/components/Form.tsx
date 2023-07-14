"use client";

import MessageInput from "./MessageInput";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi";
import { HiPhoto } from "react-icons/hi2";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });

    axios.post(`/api/messages`, {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 bg-black  border-t border-gray-900 flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton onUpload={handleUpload} uploadPreset="tbm84y0e" options={{ maxFiles: 1 }}>
        <HiPhoto size={30} className="text-white" />
      </CldUploadButton>
      <form className="flex items-center gap-2 lg:gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
        <MessageInput id="message" register={register} errors={errors} required placeholder="Отправьте сообщение" />
        <button className="rounded-full p-2 bg-blue-500 hover:bg-blue-400 cursor-pointer" type="submit">
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};
export default Form;
