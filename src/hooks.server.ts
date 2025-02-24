import { type Handle, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import { sequence } from '@sveltejs/kit/hooks';
import { pb } from '$lib';

const PUBLIC_ROUTES = ['/login'];
const PROTECTED_ROUTES = ['/admin'];

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
const COOKIE_OPTIONS = {
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax',
	httpOnly: true,
	path: '/',
	maxAge: ONE_WEEK_IN_SECONDS
};

export const authentication: Handle = async ({ event, resolve }) => {
	event.locals.pb = pb;
	const cookieHeader = event.request.headers.get('cookie') ?? '';
	event.locals.pb.authStore.loadFromCookie(cookieHeader);

	try {
		if (event.locals.pb.authStore.isValid) {
			event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
		}
	} catch (error) {
		console.error('Error during authentication:', error);
		event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}

	const response = await resolve(event);
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie(COOKIE_OPTIONS));
	return response;
};

export const authorization: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;
	const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
	const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
	const isAuthenticated = Boolean(event.locals.user);

	if (isProtectedRoute && !isAuthenticated) {
		const fromUrl = event.url.pathname + event.url.search;
		throw redirect(303, `/login?redirectTo=${encodeURIComponent(fromUrl)}`);
	}

	// Only redirect away from public routes if authenticated
	if (isPublicRoute && isAuthenticated && pathname === '/login') {
		const redirectTo = event.url.searchParams.get('redirectTo') || '/';
		throw redirect(303, redirectTo);
	}

	const response = await resolve(event);
	response.headers.set('x-auth-status', isAuthenticated ? '1' : '0');

	return response;
};

export const handle = sequence(authentication, authorization);
