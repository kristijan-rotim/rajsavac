import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/topic');
	const data = await response.json();
	return { topics: data.topics };
};

export const actions = {
	create: async ({ request, fetch }) => {
		const formData = await request.formData();
		try {
			const response = await fetch('/api/post', {
				method: 'POST',
				body: formData
			});
			if (!response.ok) {
				const errorText = await response.text();
				console.error('Error response from /api/post:', errorText);
				throw new Error('Failed to create post');
			}
			const data = await response.json();
			return { success: true, data };
		} catch (err) {
			console.error('Error creating post:', err);
			return { success: false, error: 'Failed to create post' };
		}
	}
} satisfies Actions;
