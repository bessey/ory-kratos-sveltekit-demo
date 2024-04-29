<script>
	export let data;
</script>

<svelte:head>
	<title>Error</title>
</svelte:head>

<h1 class="font-semibold text-2xl text-center mb-2">Error</h1>
<p class="w-full">A following error has occured during authentication process</p>
<pre class="w-full h-full overflow-scroll">
<code>
  {JSON.stringify(data, null, 4)}
</code>
</pre>

<div class="w-full mt-10 flex flex-col gap-2">
	<span
		>Something went wrong <a
			href="/identity/login"
			class="font-medium text-aerospace-500 hover:text-aerospace-700">Home</a
		></span
	>
</div>
