<script lang="ts">
	import Field from '../kratos/Field.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { onMount } from 'svelte';
	import { groupNodes, mapGroup, orderNodes, toastKratosMessages } from '../utils';

	export let data;

	orderNodes(data.kratos.ui.nodes);
	let groups = groupNodes(data.kratos.ui.nodes);
	onMount(() => toastKratosMessages(data.kratos.ui));
</script>

<svelte:head>
	<title>Account settings</title>
</svelte:head>

<h1 class="font-semibold text-center tracking-tight text-2xl sm:text-3xl my-1 sm:my-3">
	Account settings
</h1>

<Tabs.Root class=" bg-white p-8">
	<Tabs.List>
		{#each groups as group}
			<Tabs.Trigger value={group.name}>{mapGroup(group.name)}</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each groups as group}
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

<div class="w-full mt-10">
	<span
		>Done with changes? <a href="/" class="font-medium text-aerospace-500 hover:text-aerospace-700"
			>Home</a
		></span
	>
</div>
