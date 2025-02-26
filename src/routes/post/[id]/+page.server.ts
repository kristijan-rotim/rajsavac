import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { pb } from '$lib';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const post = await pb.collection('posts').getOne(params.id);

		if (!post.cover) {
			post.cover = '/placeholder.png';
		} else {
			post.cover = `/api/images/${post.collectionId}/${post.id}/${post.cover}`;
		}

		return { post };
	} catch (e) {
		throw error(404, 'Post not found');
	}
};
