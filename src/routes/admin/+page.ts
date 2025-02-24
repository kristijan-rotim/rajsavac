import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/auth/status');

	if (!response.ok) {
		throw redirect(307, '/login');
	}

	return {};
};
