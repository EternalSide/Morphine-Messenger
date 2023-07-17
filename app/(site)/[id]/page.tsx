import UserProfile from "./components/UserProfile";
import Sidebar from "@/app/components/sidebar/Sidebar";

const userProfile = ({ params }: { params: { id: string } }) => {
  return <UserProfile id={params.id} />;
};

export default userProfile;
