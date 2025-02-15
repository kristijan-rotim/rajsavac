import type { LayoutServerLoad } from './$types';
import { pb } from '$lib';

export const load: LayoutServerLoad = async ({ locals }) => {
    const user = locals.user;

    const avatarUrl = user?.avatar && user?.collectionId && user?.id
        ? `${pb.baseURL}/api/files/${user.collectionId}/${user.id}/${user.avatar}`
        : '/placeholder.png';

    return {
        user,
        avatarUrl
    };
};