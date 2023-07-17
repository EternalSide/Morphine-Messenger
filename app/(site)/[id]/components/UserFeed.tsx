import UserPost from "./UserPost";
import { User } from "@prisma/client";

interface UserFeedProps {
  user: User;
}
const UserFeed: React.FC<UserFeedProps> = ({ user }) => {
  if (!user?.posts) {
    return (
      <div className="flex flex-col  justify-center  lg:w-2/4 sm:w-3/4">
        <h2 className="text-neutral-500 font-bold text-center text-xl mt-6">Информация отсуствует.</h2>
      </div>
    );
  }
  return (
    <div className="flex flex-col  justify-center border-[1px] border-t-[0] border-neutral-800 lg:w-2/4 sm:w-3/4 overflow-y-auto">
      <UserPost userImage={user.image!} username={user.name!} />
    </div>
  );
};
export default UserFeed;
