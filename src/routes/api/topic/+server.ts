import { pb } from '$lib';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const name = url.searchParams.get('name');

		if (name) {
			const topic = await pb.collection('topic').getFirstListItem(`name = '${name}'`, {
				fields: 'id,name'
			});
			return json({ topic });
		}

		const topicsResult = await pb.collection('topic').getFullList({
			sort: 'name',
			fields: 'id,name'
		});

		return json({ topics: topicsResult });
	} catch (err) {
		console.error('Error fetching topics:', err);
		return json({ topics: [] }, { status: 500 });
	}
};
