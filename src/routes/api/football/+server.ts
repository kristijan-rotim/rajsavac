import { pb } from '$lib';
import { Cache } from '$lib/cache';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

const footballCache = new Cache(1);
const CACHE_KEY = 'football_teams';

export const GET: RequestHandler = async () => {
	let records = footballCache.get(CACHE_KEY);

	if (!records) {
		const result = await pb.collection('football_team').getList(1, 20, {
			sort: 'position',
			fields: 'id,club,matches,wins,draws,losses,goalsFor,goalsAgainst,goalDiff,points,position'
		});

		records = result.items;
		footballCache.set(CACHE_KEY, records);
	}

	return json(records);
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	await pb.collection('football_team').create(data);
	footballCache.clear();
	return json({ success: true });
};
