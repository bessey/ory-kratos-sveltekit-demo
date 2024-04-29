import { env } from '$env/dynamic/public';
import { buildAxiosInstance } from '$lib/client/axios/utils';
import { Configuration, FrontendApi } from '@ory/kratos-client';

export const AXIOS_INSTANCE = buildAxiosInstance({ baseURL: env.PUBLIC_KRATOS });

export const frontend = new FrontendApi(new Configuration({}), undefined, AXIOS_INSTANCE);
