import type { PageServerLoad } from './$types';
import { pb } from '$lib';

export const load: PageServerLoad = async () => {
	const teams = await pb.collection('football_team').getFullList({
		sort: 'position'
	});

	return { teams };
};
