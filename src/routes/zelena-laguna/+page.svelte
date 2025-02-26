<script lang="ts">
	import PostGrid from '$lib/components/PostGrid.svelte';
	import type { Post } from '$lib/types';
	import { Heading } from 'flowbite-svelte';

	export let data: {
		posts: Post[];
	};
</script>

<div class="space-y-16 pt-16">
	<Heading class="text-center">ŠRD Zelena Laguna</Heading>
	<PostGrid posts={data.posts} />
</div>