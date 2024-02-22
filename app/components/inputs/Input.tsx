"use client";

import clsx from "clsx";
import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";

interface InputProps {
	label: string;
	id: string;
	type?: string;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	disabled?: boolean;
	white?: boolean;
}

const Input: React.FC<InputProps> = ({
	label,
	id,
	register,
	required,
	errors,
	type = "text",
	disabled,
	white,
}) => {
	return (
		<div>
			<p
				className={clsx(
					`
        block 
        text-sm 
        font-medium 
        leading-6 
        text-gray-900
      `,
					white && "text-white"
				)}
			>
				{label}
			</p>
			<div className='mt-2'>
				<input
					id={id}
					type={type}
					autoComplete={id}
					disabled={disabled}
					{...register(id, {required})}
					className={clsx(
						`form-input
            block 
            w-full 
         
            border-0 
            border-b-[1px]
            border-neutral-800
            py-1.5 
            text-gray-900 
            shadow-sm 
            ring-0 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-0
            focus:ring-inset 
            focus:ring-sky-500 
            sm:text-sm 
            sm:leading-6
            `,
						errors[id] && "focus:ring-rose-500",
						disabled && "opacity-50 cursor-default",
						white &&
							"bg-black text-white border-b-[1px] border-gray-700 rounded-none focus:ring-0 "
					)}
				/>
			</div>
		</div>
	);
};

export default Input;
