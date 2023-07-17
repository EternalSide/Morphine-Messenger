import UserBox from "./UserBox";
import { User } from "@prisma/client";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-l border-neutral-800 block w-full left-0">
      <div>
        <h2 className="block text-xl font-bold text-white py-4 pl-6">Пользователи</h2>
        {users.map((user) => {
          return <UserBox key={user.id} user={user} />;
        })}
      </div>
    </aside>
  );
};
export default UserList;
