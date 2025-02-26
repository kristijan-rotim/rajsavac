import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	const topicResponse = await fetch('/api/topic?name=ŠRD Zelena Laguna');

	if (!topicResponse.ok) {
		throw error(404, 'Topic not found');
	}

	const topicData = await topicResponse.json();
	if (!topicData.topic) {
		throw error(404, 'Topic not found');
	}

	const postsResponse = await fetch(`/api/post?topicId=${topicData.topic.id}`);

	if (!postsResponse.ok) {
		throw error(500, 'Failed to fetch posts');
	}

	const postsData = await postsResponse.json();

	return { posts: postsData.posts };
};
