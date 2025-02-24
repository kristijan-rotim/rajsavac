import type { LayoutServerLoad } from './$types';
import { Cache } from '$lib/cache';

const avatarCache = new Cache<string>(3600);
const AVATAR_CACHE_KEY = 'user_avatar';

export const load: LayoutServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user?.avatar || !user?.collectionId || !user?.id) {
		return {
			user,
			avatarUrl: '/placeholder.png'
		};
	}

	const cachedAvatar = avatarCache.get(AVATAR_CACHE_KEY);
	if (cachedAvatar) {
		return {
			user,
			avatarUrl: cachedAvatar
		};
	}

	const avatarUrl = `/api/images/${user.collectionId}/${user.id}/${user.avatar}`;
	avatarCache.set(AVATAR_CACHE_KEY, avatarUrl);

	return {
		user,
		avatarUrl
	};
};
