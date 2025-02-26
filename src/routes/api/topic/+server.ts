import { pb } from '$lib';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const name = url.searchParams.get('name');

		if (!name) {
			return json({ topic: null }, { status: 400 });
		}

		const topic = await pb.collection('topic').getFirstListItem(`name = '${name}'`, {
			fields: 'id,name'
		});

		return json({ topic });
	} catch (err) {
		console.error('Error fetching topic:', err);
		return json({ topic: null }, { status: 404 });
	}
};
