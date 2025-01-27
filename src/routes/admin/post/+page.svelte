<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="container mx-auto p-6">
	<h1 class="mb-6 text-3xl font-bold">Create New Post</h1>

	<form
		method="POST"
		action="?/create"
		use:enhance
		enctype="multipart/form-data"
		class="max-w-2xl space-y-6"
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
			<label for="cover" class="block text-sm font-medium">Cover Image</label>
			<input
				type="file"
				id="cover"
				name="cover"
				accept="image/*"
				required
				class="w-full rounded-md border p-2"
			/>
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

		<button
			type="submit"
			class="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
		>
			Create Post
		</button>
	</form>
</div>
