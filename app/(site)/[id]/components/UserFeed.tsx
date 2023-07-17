import UserPost from "./UserPost";
import { User } from "@prisma/client";

interface UserFeedProps {
  user: User;
}
const UserFeed: React.FC<UserFeedProps> = ({ user }) => {
  return (
    <div className="flex flex-col  justify-center  lg:w-2/4 sm:w-3/4">
      <h2 className="text-neutral-500 font-bold text-center text-xl mt-6">Информация отсуствует.</h2>
    </div>
  );
};
export default UserFeed;
