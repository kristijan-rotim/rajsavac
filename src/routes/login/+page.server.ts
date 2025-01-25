import { error, redirect } from "@sveltejs/kit";

export const actions = {
	login: async ({ locals, request }: { locals: any, request: any }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection("users").authWithPassword(body.email, body.password);

			if (!locals.pb?.authStore?.verified) {
				locals.pb.authStore.clear();
				return { notVerified: true };
			}
		} catch (err: any) {
			console.log("Error: ", err);
			throw error(err.status, err.message);
		}

		throw redirect(303, "/admin");
	},
};