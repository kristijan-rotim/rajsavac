import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../../$types';
import { error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals }) => {
    if (!locals.pb) throw error(500, 'PocketBase client not initialized');

    locals.pb.authStore.clear();
    locals.user = undefined;

    return json({ success: true });
};