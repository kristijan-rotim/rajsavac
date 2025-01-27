import { type Handle, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from "$lib/utils";
import { sequence } from "@sveltejs/kit/hooks";
import { pb } from '$lib/index';

export const authentication: Handle = async ({ event, resolve }) => {
	event.locals.pb = pb;
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = serializeNonPOJOs(event.locals.pb.authStore);
		}
	} catch (_) {
		event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}

	const response = await resolve(event);

	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		})
	);

	return response;
}

export const authorization: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	console.log("PATH => " + pathname)

	// Define route patterns
	const PUBLIC_ROUTES = ['/login'];
	const PROTECTED_ROUTES = ['/admin', '/dashboard', '/profile'];

	const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
	const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
	const isAuthenticated = !!event.locals.user;

	// Handle authentication redirects
	if (isPublicRoute && isAuthenticated) {
		throw redirect(303, '/');
	}

	if (isProtectedRoute && !isAuthenticated) {
		const fromUrl = event.url.pathname + event.url.search;
		throw redirect(303, `/login?redirectTo=${encodeURIComponent(fromUrl)}`);
	}

	// Add auth status to response headers for client-side checks
	const response = await resolve(event);
	response.headers.append('x-auth-status', isAuthenticated ? '1' : '0');

	return response;
}

// Create a handle for checking page navigation
export const navigationGuard: Handle = async ({ event, resolve }) => {
	if (event.request.method === 'GET') {
		const response = await resolve(event);
		response.headers.append('x-sveltekit-page', event.url.pathname);
		return response;
	}
	return resolve(event);
}

export const handle = sequence(authentication, authorization, navigationGuard);