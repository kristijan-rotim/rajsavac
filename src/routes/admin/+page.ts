import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { isAuthenticated } from '$lib/auth';

export const load: PageLoad = async ({ fetch }) => {
	if (!(await isAuthenticated(fetch))) {
		throw redirect(307, '/login');
	}

	return {};
};