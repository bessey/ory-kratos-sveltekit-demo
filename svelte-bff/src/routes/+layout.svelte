<script lang="ts">
	import { LogIn, LogOut, Settings, ShieldCheck, UserPlus } from 'lucide-svelte';
	import '../app.css';
	import Toaster from '$lib/components/Toaster.svelte';

	export let data;
	let session = data.session;
	let isVerified = session && session.identity.verifiable_addresses[0].verified;
</script>

<div class="container mx-auto my-4">
	<header>
		{#if session}
			Hello {session.identity.traits.email}
		{/if}
		<nav class="mt-4">
			<ul class="flex flex-col gap-2">
				{#if session}
					<li class="flex flex-row items-center gap-2 group">
						<Settings
							class="min-h-4 min-w-4 h-4 w-4 max-h-4 max-w-4
					 group-hover:text-aerospace-600 duration-300
					 "
						/>
						<a href="/identity/settings">Settings</a>
					</li>
					{#if data.flows['verification'] == true && isVerified == false}
						<li class="flex flex-row items-center gap-2 group">
							<ShieldCheck
								class="min-h-4 min-w-4 h-4 w-4 max-h-4 max-w-
					 group-hover:text-aerospace-600 duration-300
					"
							/>
							<a href="/identity/verification">Verification</a>
						</li>
					{/if}
					<li class="flex flex-row items-center gap-2 group">
						<LogOut
							class="min-h-4 min-w-4 h-4 w-4 max-h-4 max-w-4
					group-hover:text-aerospace-600 duration-300
					"
						/>
						<a href="/identity/logout">Log out</a>
					</li>
				{:else}
					<li class="flex flex-row items-center gap-2 group">
						<UserPlus
							class="min-h-4 min-w-4 h-4 w-4 max-h-4 max-w-4
			group-hover:text-aerospace-600 duration-300
			"
						/>
						<a href="/identity/registration">Register</a>
					</li>

					<li class="flex flex-row items-center gap-2 group">
						<LogIn
							class="min-h-4 min-w-4 h-4 w-4 max-h-4 max-w-4
				group-hover:text-aerospace-600 duration-300
				"
						/>
						<a href="/identity/login">Log in</a>
					</li>
				{/if}
			</ul>
		</nav>
	</header>
	<main>
		<slot />
	</main>
	<Toaster />
</div>
