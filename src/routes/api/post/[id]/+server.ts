import { pb } from '$lib';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Post } from '$lib/types';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const post = await pb.collection('post').getOne(params.id);

		const formattedPost: Post = {
			id: post.id,
			title: post.title,
			shortDescription: post.shortDescription,
			topicId: null,
			cover: post.cover
				? `/api/images/${post.collectionId}/${post.id}/${post.cover}`
				: '/placeholder.png'
		};

		return json({ item: formattedPost });
	} catch (err) {
		return json({ item: null }, { status: 404 });
	}
};
