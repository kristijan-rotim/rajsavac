import { pb } from '$lib';
import { Cache } from '$lib/cache';
import type { PageServerLoad } from './$types';

const footballCache = new Cache(300);
const CACHE_KEY = 'football_table';

export const load: PageServerLoad = async () => {
	let records = footballCache.get(CACHE_KEY);

	if (!records) {
		const result = await pb.collection('football_team').getList(1, 50, {
			sort: 'position',
			fields: 'id,club,matches,wins,draws,losses,goalDiff,points,position'
		});

		records = result.items;
		footballCache.set(CACHE_KEY, records);
	}

	return { footballData: records };
};
