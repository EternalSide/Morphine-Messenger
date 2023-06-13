"use client";
type Variant = "LOGIN" | "REGISTER";
import AuthSocialButton from "../AuthSocialButton";
import { BsGithub } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { useState, useCallback } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toogleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
      console.log(variant);
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      // AXIOS REGISTER
    }
    if (variant === "LOGIN") {
      // nextauth signin
    }
  };
  const socialAction = (action: string) => {
    setIsLoading(true);
    // nextauth social sign in
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && <Input id="name" label="Name" register={register} disabled={isLoading} errors={errors} />}
          <Input id="email" label="Email" type="email" register={register} errors={errors} />
          <Input id="password" label="Пароль" type="password" register={register} errors={errors} />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "REGISTER" ? "Регистрация" : "Войти"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm ">
              <span className="bg-white px-2 text-gray-500">Или войдите с помощью</span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction("github")} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction("google")} />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>{variant === "LOGIN" ? "Впервые на NextChat?" : "Уже есть аккаунт?"}</div>
          <div className="underline cursor-pointer" onClick={toogleVariant}>
            {variant === "LOGIN" ? "Создать аккаунт" : "Войти"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
