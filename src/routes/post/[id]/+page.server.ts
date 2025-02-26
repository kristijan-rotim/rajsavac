import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const response = await fetch(`/api/post/${params.id}`);

	if (!response.ok) {
		throw error(response.status, 'Post not found');
	}

	const data = await response.json();

	if (!data.item) {
		throw error(404, 'Post not found');
	}

	return { post: data.item };
};
