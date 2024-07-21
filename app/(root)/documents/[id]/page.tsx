import CollaborativeRoom from '@/components/CollaborativeRoom';
import { getDocument } from '@/lib/actions/room.actions'; // Uncommented the import for getClerkUsers
import { getClerkUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Document = async ({ params: { id } }: SearchParamProps) => {
	const clerkUser = await currentUser();
	if (!clerkUser) redirect('/sign-in');

	const room = await getDocument({
		roomId: id,
		userId: clerkUser.emailAddresses[0].emailAddress,
	});

	if (!room) redirect('/');

	const userIds = Object.keys(room.usersAccesses);
	const users = await getClerkUsers({ userIds });

	const usersData = users.map((user: User) => ({
		...user,
		userType: room.usersAccesses[user.email]?.includes('room:write')
			? 'editor'
			: 'viewer',
	}));

	const currentUserType = room.usersAccesses[
		clerkUser.emailAddresses[0].emailAddress
	]?.includes('room:write')
		? 'editor'
		: 'viewer';

	return (
		<main className=' flex-col flex items-center w-full'>
			<CollaborativeRoom
				roomId={id}
				roomMetadata={room.metadata}
				users={usersData} // Added this line
				currentUserType={currentUserType} // And this line
			/>
		</main>
	);
};

export default Document;
