import {IconType} from "react-icons";

interface AuthSocialButtonProps {
	icon: IconType;
	onClick: () => void;
	title: string;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({icon: Icon, onClick, title}) => {
	return (
		<button
			type='button'
			onClick={onClick}
			className='inline-flex
      w-full
  justify-between
      items-center
      rounded-md
      bg-black
      px-4
      py-2
      shadow-sm
      ring-1
      ring-inset
      ring-neutral-800
     text-white
      focus:outline-offset-0 hover:bg-neutral-900 transition'
		>
			<Icon color='white' />
			<p>Войти с помощью {title}</p>
			<div></div>
		</button>
	);
};
export default AuthSocialButton;
