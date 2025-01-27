import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { pb } from '$lib/index';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		try {
			await pb.collection('users').authWithPassword(
				email as string,
				password as string
			);

			return { success: true };
		} catch (err) {
			console.log(err);
			return fail(400, {
				error: 'Invalid email or password',
				email: email as string
			});
		}
	}
} satisfies Actions;