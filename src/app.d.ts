// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
interface User {
	id: string;
	name: string;
	username: string;
	email: string;
	avatar: string;
	collectionId: number;
	verified: boolean;
	updated: string;
	created: string;
}

declare global {
	namespace App {
		type PocketBase = import('pocketbase').default;

		interface Locals {
			pb?: PocketBase;
			user?: User
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };