export async function isAuthenticated(fetch: typeof window.fetch): Promise<boolean> {
	const response = await fetch('/api/auth/status');

	return response.ok;
}
