import UserProfile from "./components/UserProfile";

const userProfile = ({ params }: { params: { id: string } }) => {
  return <UserProfile id={params.id} />;
};

export default userProfile;
