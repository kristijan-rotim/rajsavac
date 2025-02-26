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

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const coverFile = formData.get('cover') as File;
		const isPublic = formData.get('isPublic') === 'on';

		const pbFormData = new FormData();
		pbFormData.append('title', formData.get('title') as string);
		pbFormData.append('cover', coverFile);
		pbFormData.append('isPublic', String(isPublic));
		pbFormData.append('shortDescription', formData.get('shortDescription') as string);
		pbFormData.append('topicId', formData.get('topicId') as string);

		const record = await pb.collection('post').create(pbFormData);

		return json({ success: true, data: record });
	} catch (err) {
		console.error('Error creating post:', err);
		return json({ success: false, error: 'Failed to create post' }, { status: 500 });
	}
};
