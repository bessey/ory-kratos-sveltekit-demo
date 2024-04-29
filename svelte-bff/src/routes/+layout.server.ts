import { checkEnabledFlows } from '$lib/kratos';

export const load = async ({ locals }) => {
	const flows = await checkEnabledFlows();

	const session = locals.session;

	return {
		session,
		flows
	};
};
