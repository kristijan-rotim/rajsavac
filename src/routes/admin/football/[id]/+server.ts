import { pb } from '$lib';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ params, request }) => {
	const data = await request.json();
	const record = await pb.collection('football_team').update(params.id, data);
	return json(record);
};
