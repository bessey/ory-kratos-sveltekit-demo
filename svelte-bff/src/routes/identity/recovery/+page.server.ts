import { redirect } from '@sveltejs/kit';
import { buildErrorResponseHandler, initialFlowRedirect } from '../utils';
import { frontend } from '../../../lib/client/axios/kratos';

export const load = async ({ url, request }) => {
	const flowId = url.searchParams.get('flow');
	const redirectUrl = initialFlowRedirect(url);
	if (redirectUrl) return redirect(301, redirectUrl);

	const cookie = request.headers.get('Cookie') || '';
	const response = await frontend
		.getRecoveryFlow({ id: flowId, cookie })
		.catch(buildErrorResponseHandler('recovery'));

	return {
		kratos: response.data
	};
};
