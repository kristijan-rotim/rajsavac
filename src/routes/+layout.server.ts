import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const user = locals.user;

	const avatarUrl =
		user?.avatar && user?.collectionId && user?.id
			? `/api/images/${user.collectionId}/${user.id}/${user.avatar}`
			: '/placeholder.png';

	return {
		user,
		avatarUrl
	};
};
