import { pb } from '$lib';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Post } from '$lib/types';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const topicId = url.searchParams.get('topicId');
		const filterString = topicId ? `isPublic = true && topicId = '${topicId}'` : 'isPublic = true';

		const postsResult = await pb.collection('post').getList(1, 6, {
			sort: '-updated',
			filter: filterString
		});

		const posts: Post[] = postsResult.items.map((post) => ({
			id: post.id,
			title: post.title,
			shortDescription: post.shortDescription,
			topicId: post.topicId,
			cover: post.cover
				? `/api/images/${post.collectionId}/${post.id}/${post.cover}`
				: '/placeholder.png'
		}));

		return json({ posts });
	} catch (err) {
		console.error('Error fetching posts:', err);
		return json({ posts: [] }, { status: 500 });
	}
};
