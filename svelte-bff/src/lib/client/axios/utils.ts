import axios from 'axios';

function inspect(obj: unknown) {
	return JSON.stringify(obj, null, 2);
}

export const requestInterceptor = (request) => {
	const log = {
		method: request.method,
		url: request.url,
		params: request.params,
		data: request.data
	};
	console.log('Request:', inspect(log));
	return request;
};

export const responseInterceptor = (response) => {
	const log = {
		status: response.status,
		data: response.data
	};
	console.log('Response:', inspect(log));
	return response;
};

export const buildAxiosInstance = (options) => {
	const instance = axios.create(options);
	instance.interceptors.request.use(requestInterceptor);
	instance.interceptors.response.use(responseInterceptor);
	return instance;
};
