import UserHeader from "./UserHeader";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface UserProfileProps {
	id: string;
}
const UserProfile: React.FC<UserProfileProps> = async ({id}) => {
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	});
	const currentUser = await getCurrentUser();
	const isOwnProfile = currentUser?.id === id;
	return (
		<div className='lg:pl-80'>
			<div className='flex flex-col items-center justify-center  relative'>
				<div className='group w-full'>
					{user?.banner ? (
						<img
							className='h-[200px] w-full object-cover object-top   transition'
							alt='Баннер Пользователя'
							src={user?.banner || "https://wallpapercave.com/wp/wp8063529.jpg"}
						/>
					) : (
						<div className='bg-neutral-900 h-[200px] w-full'></div>
					)}
				</div>
				<UserHeader
					user={user!}
					isOwnProfile={isOwnProfile}
				/>
			</div>
		</div>
	);
};
export default UserProfile;
