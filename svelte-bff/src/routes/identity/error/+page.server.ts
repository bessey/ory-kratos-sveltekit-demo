import { redirect } from '@sveltejs/kit';
import { frontend } from '../../../lib/client/axios/kratos';

export const load = async ({ url }) => {
	const errorId = url.searchParams.get('id');

	if (errorId == null) {
		redirect(301, '/');
	}

	const response = await frontend.getFlowError({ id: errorId });

	return response.data;
};
