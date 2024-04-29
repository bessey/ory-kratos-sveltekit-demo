import { redirect } from '@sveltejs/kit';
import { frontend } from '../../../lib/client/axios/kratos';

export const load = async ({ request }) => {
	const cookie = request.headers.get('Cookie') || '';
	const response = await frontend.createBrowserLogoutFlow({ cookie });
	redirect(301, response.data.logout_url);
};
