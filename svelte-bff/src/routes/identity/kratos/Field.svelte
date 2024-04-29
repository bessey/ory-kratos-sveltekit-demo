<script lang="ts">
	import { browser } from '$app/environment';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';
	import type { UiNode } from '@ory/kratos-client';
	import {
		nodeIsAnchorType,
		nodeIsImageType,
		nodeIsInputType,
		nodeIsScriptType,
		nodeIsTextType
	} from '../predicates';
	import Code from './Code.svelte';
	import Text from './Text.svelte';

	export let node: UiNode;

	function referrerPolicy(node: UiNode) {
		if (!nodeIsScriptType(node)) throw new Error('Node is not a script');
		return node.attributes.referrerpolicy as ReferrerPolicy;
	}
</script>

{#if nodeIsAnchorType(node)}
	<a
		class="text-center
			w-full py-2 px-2 rounded-lg font-bold mt-6
			bg-aerospace-600 text-white hover:bg-aerospace-700
		"
		href={node.attributes.href}
	>
		{node.attributes.title.text}
	</a>
{:else if nodeIsImageType(node)}
	<fieldset class="flex flex-col min-w-0">
		<img
			src={node.attributes.src}
			alt={node.meta.label?.text}
			width={node.attributes.width}
			height={node.attributes.height}
			class="my-3 self-center"
		/>
	</fieldset>
{:else if nodeIsTextType(node)}
	<Text {node} />
{:else if nodeIsScriptType(node)}
	{#if browser}
		<script
			src={node.attributes.src}
			async={node.attributes.async}
			referrerpolicy={referrerPolicy(node)}
			crossorigin={node.attributes.crossorigin}
			integrity={node.attributes.integrity}
			type={node.attributes.type}
			id={node.attributes.id}
			nonce={node.attributes.nonce}
		></script>
	{/if}
{:else if nodeIsInputType(node)}
	{#if node.attributes.type == 'submit'}
		<Button type="submit" name={node.attributes.name} value={node.attributes.value}>
			{node.meta.label?.text}
		</Button>
	{:else if node.attributes.type == 'button'}
		<Button
			name={node.attributes.name}
			value={node.attributes.value}
			on:click={() => node.attributes.onclick && eval(node.attributes.onclick)}
		>
			{node.meta.label?.text}
		</Button>
	{:else if node.attributes.type == 'hidden'}
		<input
			type={node.attributes.type}
			name={node.attributes.name}
			value={node.attributes.value || ''}
			id={node.attributes.name}
		/>
	{:else if node.attributes.name == 'code' || node.attributes.name == 'totp_code'}
		<Code {node} />
	{:else if node.attributes.type == 'password'}
		<fieldset class="relative">
			<Label for={node.attributes.name}>
				{node.meta.label?.text}
			</Label>
			<Input type="password" required={node.attributes.required} name={node.attributes.name} />
		</fieldset>
	{:else}
		<fieldset class="relative">
			<Label for={node.attributes.name}>
				{node.attributes.required == true
					? `${node.meta.label?.text} *`
					: `${node.meta.label?.text}`}
			</Label>
			<Input
				placeholder=" "
				type={node.attributes.type}
				name={node.attributes.name}
				value={node.attributes.value || ''}
				id={node.attributes.name}
				pattern={node.attributes.pattern}
				disabled={node.attributes.disabled}
				autocomplete={node.attributes.autocomplete}
				required={node.attributes.required && node.attributes.name != 'csrf_token'}
			/>
		</fieldset>
	{/if}
{:else}
	(Unknown node {node.attributes.node_type})
{/if}
