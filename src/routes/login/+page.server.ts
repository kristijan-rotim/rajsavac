import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { serializeNonPOJOs } from '$lib/utils';

export const actions = {
	default: async ({ request, locals, url }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		try {
			if (!locals?.pb) throw new Error('PocketBase client not initialized');

			const authData = await locals.pb.collection('users').authWithPassword(
				email as string,
				password as string
			);

			if (!authData?.record) {
				throw new Error('Authentication failed');
			}

			locals.user = serializeNonPOJOs(authData.record);
			locals.pb.authStore.save(authData.token, authData.record);

			const redirectTo = url.searchParams.get('redirectTo') || '/';

			return { success: true, redirectTo };
		} catch (error: any) {
			console.error('Login failed:', error.message || error);
			return fail(400, {
				error: 'Invalid email or password',
				email: email as string
			});
		}
	}
} satisfies Actions;