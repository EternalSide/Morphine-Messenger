interface UserHeaderButtonProps {
  onClick: () => void;
  title: string;
}

const UserHeaderButton: React.FC<UserHeaderButtonProps> = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="lg:mt-0 bg-white mt-3 text-black border-none hover:opacity-90 transition outline-none rounded-md h-[40px] w-44"
    >
      {title}
    </button>
  );
};
export default UserHeaderButton;
