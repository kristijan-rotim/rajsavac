import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	if (!locals.user) {
		throw redirect(303, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);
	}
	return { user: locals.user };
}