<script lang="ts">
	import type { Post } from '$lib/types';

	export let data: {
		post: Post;
	};
</script>

<article class="mx-auto mt-16 max-w-4xl px-4">
	{#if data.post}
		{#if data.post.cover}
			<img
			  src={data.post.cover}
			  alt={data.post.title}
			  class="mb-8 h-96 w-full rounded-lg object-cover"
			/>
		{/if}
		<h1 class="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
			{data.post.title}
		</h1>
		<div class="prose prose-lg dark:prose-invert">
			{data.post.shortDescription}
		</div>
	{:else}
		<p class="text-center text-xl text-gray-600">Post not found</p>
	{/if}
</article>