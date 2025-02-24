import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: ['https://rajsavac.space'], // Add your domain here
		host: '0.0.0.0', // Ensure the server binds to all interfaces
		port: 5173
	},
});
