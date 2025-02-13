import { type Handle, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import { sequence } from '@sveltejs/kit/hooks';
import { pb } from '$lib';

// Define route patterns outside the handler functions
const PUBLIC_ROUTES = ['/login'];
const PROTECTED_ROUTES = ['/admin', '/dashboard', '/profile'];

// Define cookie options
const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
const COOKIE_OPTIONS = {
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax',
	httpOnly: true,
	path: '/',
	maxAge: ONE_WEEK_IN_SECONDS
};

export const authentication: Handle = async ({ event, resolve }) => {
	// Setup PocketBase client in locals and load authStore from incoming cookies
	event.locals.pb = pb;
	const cookieHeader = event.request.headers.get('cookie') ?? '';
	event.locals.pb.authStore.loadFromCookie(cookieHeader);

	try {
		if (event.locals.pb.authStore.isValid) {
			// Refresh authentication state if needed
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = serializeNonPOJOs(event.locals.pb.authStore);
		}
	} catch (error) {
		// Log error details for debugging purposes
		console.error('Error during authentication:', error);
		event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}

	const response = await resolve(event);

	// Set the updated authentication cookie in the response
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie(COOKIE_OPTIONS));

	return response;
};

export const authorization: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;
	const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
	const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
	const isAuthenticated = Boolean(event.locals.user);

	// If the user is already authenticated, redirect away from public routes
	if (isPublicRoute && isAuthenticated) {
		throw redirect(303, '/');
	}

	// If the route is protected and the user is not authenticated,
	// redirect to login with a redirectTo query parameter.
	if (isProtectedRoute && !isAuthenticated) {
		const fromUrl = event.url.pathname + event.url.search;
		throw redirect(303, `/login?redirectTo=${encodeURIComponent(fromUrl)}`);
	}

	// Proceed with the request and add auth status to the response header
	const response = await resolve(event);
	response.headers.append('x-auth-status', isAuthenticated ? '1' : '0');

	return response;
};

export const handle = sequence(authentication, authorization);
