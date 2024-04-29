// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: any;
		}
		interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
