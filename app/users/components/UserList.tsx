import UserBox from "./UserBox";
import { User } from "@prisma/client";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="flex-col">
          <div className="text-xl font-bold text-neutral-800 py-4">Пользователи</div>
        </div>

        {items.map((item) => {
          console.log(item);
          return <UserBox key={item.id} data={item} />;
        })}
      </div>
    </aside>
  );
};
export default UserList;