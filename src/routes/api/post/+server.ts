import { pb } from '$lib';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Post } from '$lib/types';

export const GET: RequestHandler = async () => {
	try {
		const postsResult = await pb.collection('post').getList(1, 6, {
			sort: '-updated'
		});

		const posts: Post[] = postsResult.items.map((post) => ({
			id: post.id,
			title: post.title,
			shortDescription: post.shortDescription,
			topicId: null,
			cover: post.cover
				? `/api/images/${post.collectionId}/${post.id}/${post.cover}`
				: '/placeholder.png'
		}));

		return json({ items: posts });
	} catch (err) {
		return json({ items: [] }, { status: 500 });
	}
};
