"use client";

import AuthSocialButton from "../AuthSocialButton";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toogleVariant = useCallback(() => {
    reset();
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Ошибка! Что-то пошло не так :("))
        .finally(() => setIsLoading(false));
      router.push("/users");
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Данные не совпадают.");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Вход выполнен!");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };
  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Ошибка! Данные не верны.");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Вход выполнен!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="sm:mx-auto pl-6 pr-6 sm:w-full sm:p-0 sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow rounded-lg sm:rounded-lg sm:px-10">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <div className="h-[100px]">
              <Input id="name" label="Имя Пользователя" register={register} errors={errors} required disabled={isLoading} />
              {errors.name && <p className="text-red-500">Имя пользователя обязательно к заполнению.</p>}
            </div>
          )}
          <div className="h-[100px]">
            <Input id="email" label="Email" type="email" register={register} errors={errors} required disabled={isLoading} />
            {errors.email && <p className="text-red-500">Email обязателен к заполнению.</p>}
          </div>
          <div className="h-[100px]">
            <Input
              id="password"
              label="Пароль"
              type="password"
              register={register}
              errors={errors}
              required
              disabled={isLoading}
            />
            {errors.password && <p className="text-red-500">Пароль обязателен к заполнению.</p>}
          </div>
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
          <div className="text-blue-500 text-center mt-3">
            <p>Тестовый Аккаунт</p>
            <p>Email: Test@test.com</p>
            <p>Пароль: Test</p>
          </div>
          <div className="mt-4 flex gap-2">
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction("github")} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction("google")} />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>{variant === "LOGIN" ? "Впервые на Morphine?" : "Уже есть аккаунт?"}</div>
          <div className="underline cursor-pointer" onClick={toogleVariant}>
            {variant === "LOGIN" ? "Создать аккаунт" : "Войти"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
