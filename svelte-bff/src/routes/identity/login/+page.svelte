<script lang="ts">
	import Field from '../kratos/Field.svelte';
	import Oidc from '../kratos/Oidc.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { onMount } from 'svelte';
	import { groupNodes, mapGroup, orderNodes, toastKratosMessages } from '../utils';
	import _ from 'lodash';

	export let data;

	orderNodes(data.kratos.ui.nodes);
	let groups = groupNodes(data.kratos.ui.nodes);
	let [oidcGroups, restGroups] = _.partition(groups, (group) => group.name == 'oidc');
	onMount(() => toastKratosMessages(data.kratos.ui));
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<h1 class="font-semibold text-center tracking-tight text-2xl sm:text-3xl my-1 sm:my-3">
	Log in to your account
</h1>

{#each oidcGroups as gr, i}
	<div class="flex flex-row gap-4 items-center h-12 w-full">
		{#each gr.nodes as node}
			<Oidc {node} action={data.kratos.ui.action} />
		{/each}
	</div>
	{#if i < groups.length - 1}
		<Separator />
	{/if}
{/each}

<Tabs.Root class=" bg-white p-8">
	<Tabs.List>
		{#each restGroups as group}
			<Tabs.Trigger value={group.name}>{mapGroup(group.name)}</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each restGroups as group}
		<Tabs.Content value={group.name}>
			<form
				method={data.kratos.ui.method}
				action={data.kratos.ui.action}
				class="flex flex-col mt-4 gap-6 min-w-0"
			>
				{#each group.nodes as node}
					<Field {node} />
				{/each}
			</form>
		</Tabs.Content>
	{/each}
</Tabs.Root>

<div class="w-full mt-10 flex flex-col gap-1">
	{#if data.flows['registration'] == true}
		<span
			>No account? <a
				href="/identity/registration"
				class="font-medium text-aerospace-500 hover:text-aerospace-700">Sign up</a
			></span
		>
	{/if}
	<span
		>Locked out? <a
			href="/identity/recovery"
			class="font-medium text-aerospace-500 hover:text-aerospace-700">Recover account</a
		></span
	>
</div>
