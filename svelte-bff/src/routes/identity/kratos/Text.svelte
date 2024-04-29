<script lang="ts">
	import type { UiNode, UiNodeTextAttributes } from '@ory/kratos-client';
	import { readable } from 'svelte/store';
	import CopyButton from './CopyButton.svelte';

	export let node: UiNode & {
		attributes: UiNodeTextAttributes;
	};

	const value = readable(node.attributes.text.text);
</script>

<fieldset class="flex flex-col min-w-0">
	<div class="text-sm">
		{node.meta.label?.text}
	</div>
	<div class="flex flex-col relative w-full my-2">
		<code
			class="bg-neutral-50 dark:bg-neutral-950 rounded-lg p-1.5 w-full
    font-medium text-aerospace-600 dark:text-aerospace-400
    overflow-auto text-center"
		>
			{$value}
		</code>
		<CopyButton {value} />
	</div>
</fieldset>
