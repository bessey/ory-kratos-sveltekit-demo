import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';
import type { HandleFetch } from '@sveltejs/kit';

// Ensure cookies are always forwarded to Kratos regardless of its domain
export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (request.url.startsWith(env.PUBLIC_KRATOS)) {
		const cookie = event.request.headers.get('cookie');
		if (cookie) request.headers.set('cookie', cookie);
	}

	return fetch(request).then(async (response) => {
		response
			.clone()
			.json()
			.then((data) => console.log(JSON.stringify(data, null, 2)));
		return response;
	});
};

export const handle = async ({ event, resolve }) => {
	// VERY IMPORTANT! Do not use event.fetch because it creates infinite loop
	// when running using node adapter
	let session;
	const kratosCookie = event.cookies.get('ory_kratos_session');
	if (kratosCookie) {
		const res = await fetch(`${env.PUBLIC_KRATOS}/sessions/whoami`, {
			headers: {
				Accept: 'application/json',
				Cookie: `ory_kratos_session=${kratosCookie}`
			}
		});
		session = await res.json();

		if (session.error) {
			if (event.url.pathname == '/') {
				redirect(301, '/identity/login');
			}
			session = null;
		}
	}

	event.locals = { session };

	const response = await resolve(event);
	return response;
};
