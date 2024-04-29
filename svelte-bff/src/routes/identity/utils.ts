import { addToast } from '$lib/components/Toaster.svelte';
import type { UiContainer, UiNode, UiNodeGroupEnum } from '@ory/kratos-client';
import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';

const UI_NODE_ORDER = [
	'identifier',
	'traits.username',
	'traits.email',
	'password',
	'traits.name.first',
	'traits.name.last',
	'method'
];

const MESSAGE_MAP = {
	success: {
		title: 'Success',
		color: 'bg-emerald-500'
	},
	info: {
		title: 'Info',
		color: 'bg-sky-500'
	},
	error: {
		title: 'Error',
		color: 'bg-red-500'
	}
};

const GROUP_MAP: Record<UiNodeGroupEnum, string> = {
	code: 'Via code',
	default: 'Default',
	link: 'Link',
	lookup_secret: 'OIDC',
	oidc: 'OIDC',
	password: 'Password',
	profile: 'Profile',
	totp: 'TOTP',
	webauthn: 'Passwordless'
};

const GROUP_ORDER: UiNodeGroupEnum[] = ['profile', 'password', 'totp', 'webauthn', 'code', 'oidc'];

function mapMessage(type: 'success' | 'info' | 'error') {
	return MESSAGE_MAP[type];
}

export function mapGroup(g: string) {
	return GROUP_MAP[g] || g;
}

export function orderNodes(nodes: Array<UiNode>) {
	nodes.sort(function (a, b) {
		const oa = UI_NODE_ORDER.indexOf(a.attributes.name);
		const ob = UI_NODE_ORDER.indexOf(b.attributes.name);

		return oa < ob ? -1 : oa > ob ? 1 : 0;
	});
}

interface NodeGroup {
	name: UiNodeGroupEnum;
	nodes: UiNode[];
}

export function groupNodes(nodes: Array<UiNode>): NodeGroup[] {
	orderNodes(nodes);

	const groups: NodeGroup[] = [];
	const defaults: UiNode[] = [];

	nodes.forEach((node) => {
		const { group } = node;

		if (group === 'default') {
			defaults.push(node);
			return;
		}
		let groupFound = false;
		for (let i = 0; i < groups.length; i++) {
			if (groups[i].name == group) {
				groupFound = true;
				groups[i].nodes.push(node);
			}
		}

		if (!groupFound) {
			groups.push({
				name: group,
				nodes: [node]
			});
		}
	});

	// Add common nodes to all groups
	groups.forEach((group) => group.nodes.unshift(...defaults));

	groups.sort(function (a, b) {
		const oa = GROUP_ORDER.indexOf(a.name);
		const ob = GROUP_ORDER.indexOf(b.name);

		return oa < ob ? -1 : oa > ob ? 1 : 0;
	});

	return groups;
}

export function toastKratosMessages(ui: UiContainer) {
	if (!ui.messages) return;

	ui.messages.forEach((e) => {
		const r = mapMessage(e.type);
		addToast({
			data: {
				title: r.title,
				description: e.text,
				color: r.color
			}
		});
	});

	ui.nodes.forEach((e) => {
		e.messages.forEach((m) => {
			const r = mapMessage(m.type);
			addToast({
				data: {
					title: r.title,
					description: m.text,
					color: r.color
				}
			});
		});
	});
}

export function initialFlowRedirect(url: URL) {
	const flowId = url.searchParams.get('flow');
	const returnTo = url.searchParams.get('return_to');

	const parts = url.pathname.split('/');
	const action = parts[2];

	if (flowId == null) {
		if (returnTo == null) {
			return `${env.PUBLIC_KRATOS}/self-service/${action}/browser`;
		} else {
			return `${env.PUBLIC_KRATOS}/self-service/${action}/browser?return_to=${returnTo}`;
		}
	}
	return false;
}

export function buildErrorResponseHandler(action: string) {
	return function handleErrorResponse(error: any): never {
		const data = error?.response?.data;
		if (data.error.id == 'security_csrf_violation' || data.error.id == 'self_service_flow_expired')
			redirect(301, `/identity/${action}`);
		throw error;
	};
}
