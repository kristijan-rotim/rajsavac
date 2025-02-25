import { writable } from 'svelte/store';
import type { FootballTeam } from '$lib/types';

function createFootballStore() {
	const { subscribe, set } = writable<FootballTeam[]>([]);

	return {
		subscribe,
		load: async () => {
			const response = await fetch('/api/football');
			const data = await response.json();
			set(data);
		}
	};
}

export const footballStore = createFootballStore();
