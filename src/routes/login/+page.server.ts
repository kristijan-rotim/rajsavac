import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { pb } from '$lib';
import { serializeNonPOJOs } from '$lib/utils';

export const actions = {
	default: async ({ request, locals, url }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		try {
			// Attempt authentication via PocketBase
			await pb.collection('users').authWithPassword(email as string, password as string);
			
			// Save authenticated user to locals for later use (e.g. hooks, load functions)
			locals.user = serializeNonPOJOs(pb.authStore.record);

			// Retrieve redirect destination from query parameters with a fallback to the home page
			const redirectTo = url.searchParams.get('redirectTo') || '/';
			console.log('Login successful. Redirecting to:', redirectTo);
			
			// Throw a redirect so that SvelteKit performs the navigation
			throw redirect(303, redirectTo);
		} catch (err) {
			console.error('Login failed:', err);
			// Return a failure response if authentication fails
			return fail(400, {
				error: 'Invalid email or password',
				email: email as string
			});
		}
	}
} satisfies Actions;