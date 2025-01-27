<script lang="ts">
	import { Card, Button, Label, Input } from 'flowbite-svelte';
	import type { ActionData } from './$types';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	export let form: ActionData;
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<Card class="w-full max-w-md p-6">
		<h1 class="mb-6 text-center text-2xl font-bold text-gray-900">Login</h1>

		<form
			method="POST"
			class="space-y-4"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') {
						await goto('/admin');
					}
				};
			}}
		>
			<div>
				<Label for="email" class="mb-2">Email</Label>
				<Input
					type="email"
					id="email"
					name="email"
					autocomplete="username"
					value={form?.email ?? ''}
					required
					placeholder="Enter your email"
				/>
			</div>

			<div>
				<Label for="password" class="mb-2">Password</Label>
				<Input
					type="password"
					id="password"
					name="password"
					required
					placeholder="Enter your password"
				/>
			</div>

			{#if form?.error}
				<p class="text-center text-red-500">{form.error}</p>
			{/if}

			<Button type="submit" class="w-full">Login</Button>
		</form>
	</Card>
</div>
