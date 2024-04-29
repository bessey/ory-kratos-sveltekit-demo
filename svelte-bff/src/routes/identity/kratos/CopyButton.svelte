<script lang="ts">
	import { ClipboardCopy, ClipboardCheck } from 'lucide-svelte';

	export let value;

	let copied: boolean;

	async function copyToClipboard() {
		copied = true;
		if (isSecureContext) {
			await navigator.clipboard.writeText($value);
		} else {
			alert('Your browser does not support clipboard API');
		}
		setTimeout(() => (copied = false), 3000);
	}
</script>

<button
	type="button"
	class="group absolute end-2 top-1/2 -translate-y-1/2 border bg-white dark:bg-neutral-950 rounded-lg p-1 inline-flex items-center justify-center"
	on:click={copyToClipboard}
>
	{#if copied}
		<ClipboardCheck
			class="min-h-4 min-w-4 h-4 w-4 max-h-4 max-w-4 group-hover:scale-110 transition-all text-emerald-600"
		/>
	{:else}
		<ClipboardCopy
			class="min-h-4 min-w-4 h-4 w-4 max-h-4 max-w-4 group-hover:scale-110 transition-all"
		/>
	{/if}
</button>
