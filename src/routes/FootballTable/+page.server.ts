import { pb } from '$lib';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const result = await pb.collection('football_team').getList(1, 50, {
		sort: 'position',
		fields: 'id,club,matches,wins,draws,losses,goalDiff,points,position'
	});

	return { footballData: result.items };
};
