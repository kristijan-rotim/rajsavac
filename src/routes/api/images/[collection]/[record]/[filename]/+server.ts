import { DB_URL } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const { collection, record, filename } = params;

	try {
		const response = await fetch(`${DB_URL}/api/files/${collection}/${record}/${filename}`);

		if (!response.ok) throw error(response.status, 'Image not found');

		// Pass headers (e.g., Content-Type) to the client
		return new Response(response.body, {
			headers: {
				'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
				'Cache-Control': 'public, max-age=86400' // Cache for 7 days
			}
		});
	} catch (e) {
		throw error(500, 'Failed to fetch image');
	}
};
