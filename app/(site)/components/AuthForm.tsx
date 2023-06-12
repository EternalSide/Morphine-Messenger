"use client";
type Variant = "LOGIN" | "REGISTER";

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
    } else {
      setVariant("LOGIN");
    }
  }, []);

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
          {variant === "REGISTER" && <Input id="name" label="Name" register={register} errors={errors} />}
          <Input id="email" label="Email" type="email" register={register} errors={errors} />
          <Input id="password" label="Пароль" type="password" register={register} errors={errors} />
          <div>
            <Button>Test</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AuthForm;
