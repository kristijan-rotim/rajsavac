import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		// Remove any existing origin configuration if present
		csrf: {
			checkOrigin: false // This allows the app to work behind a proxy
		}
	}
};

export default config;
