import { type Handle, redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { DB_URL } from '$env/static/private';
import { serializeNonPOJOs } from "$lib/utils";
import { sequence } from "@sveltejs/kit/hooks";

export const authentication: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(DB_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
		event.locals.user = serializeNonPOJOs(event.locals.pb.authStore);
	} catch (_) {
		// clear the auth store on failed refresh
		event.locals.pb.authStore.clear();
	}

	const response = await resolve(event);

	const isProd = process.env.NODE_ENV === 'production';

	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie(
			{
				httpOnly: isProd,
				sameSite: 'strict',
				secure: isProd,
				maxAge: 60 * 60 * 24 * 7 // 1 week
			}
		)
	);

	return response;
}

// Define route configurations
const PUBLIC_ROUTES: string[] = ['/login', '/register', '/', '/about'];
const PROTECTED_ROUTES: string[] = ['/admin'];

export const authorization: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	// Check if the current path is a protected route
	const isProtectedRoute = PROTECTED_ROUTES.some(path =>
		pathname.startsWith(path)
	);

	// Check if user is authenticated
	const isAuthenticated = event.locals.pb?.authStore?.isValid;

	// Redirect authenticated users away from auth pages
	if (PUBLIC_ROUTES.includes(pathname) && isAuthenticated) {
		throw redirect(303, '/dashboard');
	}

	// Redirect unauthenticated users to login
	if (isProtectedRoute && !isAuthenticated) {
		throw redirect(303, '/login');
	}

	return resolve(event);
};

export const handle = sequence(authentication, authorization)