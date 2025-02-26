<script lang="ts">
	import { enhance } from '$app/forms';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let imageUrl: string | null = null;

	function handleImageChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (imageUrl) {
			URL.revokeObjectURL(imageUrl);
		}

		if (file) {
			imageUrl = URL.createObjectURL(file);
		}
	}

	onDestroy(() => {
		if (imageUrl) {
			URL.revokeObjectURL(imageUrl);
		}
	});
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50">
	<div class="w-full max-w-2xl rounded-lg bg-white p-8 shadow-sm">
		<h1 class="mb-6 text-center text-3xl font-bold">Create New Post</h1>

		<form
		  method="POST"
		  action="?/create"
		  use:enhance
		  enctype="multipart/form-data"
		  class="space-y-6"
		>
			<div class="space-y-2">
				<label for="title" class="block text-sm font-medium">Title</label>
				<input
				  type="text"
				  id="title"
				  name="title"
				  required
				  class="w-full rounded-md border p-2"
				  placeholder="Enter post title"
				/>
			</div>

			<div class="space-y-2">
				<label for="topicId" class="block text-sm font-medium">Topic</label>
				<select
				  id="topicId"
				  name="topicId"
				  required
				  class="w-full rounded-md border p-2"
				>
					<option value="">Select a topic</option>
					{#each data.topics as topic}
						<option value={topic.id}>{topic.name}</option>
					{/each}
				</select>
			</div>

			<div class="space-y-2">
				<label for="cover" class="block text-sm font-medium">Cover Image</label>
				<input
				  type="file"
				  id="cover"
				  name="cover"
				  accept="image/*"
				  required
				  on:change={handleImageChange}
				  class="w-full rounded-md border p-2"
				/>
				{#if imageUrl}
					<div class="mt-4 flex justify-center">
						<img src={imageUrl} alt="Cover preview" class="h-64 w-full rounded-lg object-cover" />
					</div>
				{/if}
			</div>

			<div class="space-y-2">
				<label for="shortDescription" class="block text-sm font-medium">Short Description</label>
				<textarea
				  id="shortDescription"
				  name="shortDescription"
				  required
				  rows="4"
				  class="w-full rounded-md border p-2"
				  placeholder="Enter a short description"
				></textarea>
			</div>

			<div class="flex items-center space-x-2">
				<input
				  type="checkbox"
				  id="isPublic"
				  name="isPublic"
				  checked
				  class="h-4 w-4 rounded border-gray-300"
				/>
				<label for="isPublic" class="text-sm font-medium">Make post public</label>
			</div>

			<button
			  type="submit"
			  class="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
			>
				Create Post
			</button>
		</form>
	</div>
</div>