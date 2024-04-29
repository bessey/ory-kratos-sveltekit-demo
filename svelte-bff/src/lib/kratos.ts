import { env } from '$env/dynamic/public';

async function checkFlow(flow: string) {
	return fetch(
		`${env.PUBLIC_KRATOS}/self-service/${flow}/browser`,
		{ redirect: 'manual' } // Not to follow redirect, otherwise infinite request loop
	);
}

export const checkEnabledFlows = async () => {
	const response = await Promise.all([
		checkFlow('registration'),
		checkFlow('verification'),
		checkFlow('recovery')
	]);

	const resultFlows = response.map((r) => {
		const flow = r.url.slice(`${env.PUBLIC_KRATOS}/self-service/`.length, -'/browser'.length);
		const enabled = r.headers.get('location')?.includes('error') ? false : true;
		return {
			flow,
			enabled
		};
	});

	const result = Object.fromEntries(resultFlows.map((e) => [e.flow, e.enabled]));

	return result;
};
