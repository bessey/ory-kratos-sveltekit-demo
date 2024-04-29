<script lang="ts">
	import type { UiNode, UiNodeInputAttributes } from '@ory/kratos-client';
	import Button from '$lib/components/ui/button/button.svelte';

	export let node: UiNode & {
		attributes: UiNodeInputAttributes;
	};
	export let action: string;

	interface Provider {
		name: string;
		logo: string;
	}

	const PROVIDERS: Record<string, Provider> = {
		github: {
			name: 'Github',
			logo: 'https://cdn-icons-png.flaticon.com/512/25/25231.png'
		},
		facebook: {
			name: 'Facebook',
			logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png'
		}
	};

	const value = node.attributes.value as string;
	const provider = PROVIDERS[value] || null;

	async function oidcFlow() {
		const response = await fetch(action, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			body: JSON.stringify({
				method: 'oidc',
				provider: node.attributes.value
			})
		});

		const res = await response.json();

		window.location.href = res.redirect_browser_to;
	}
</script>

<Button type={node.attributes.type} on:click={oidcFlow}>
	{#if provider}
		<img
			src={provider.logo}
			alt={`${provider.name}`}
			class="h-full group-hover:scale-110 duration-300"
		/>
	{/if}
</Button>
