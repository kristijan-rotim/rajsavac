<script lang="ts">
	import FootballTable from '$lib/components/FootballTable.svelte';
	import PostGrid from '$lib/components/PostGrid.svelte';
	import type { Post } from '$lib/types';
	import { Heading } from 'flowbite-svelte';

	export let data: {
		posts: Post[];
	};
</script>

<div class="space-y-16 pt-16">
	<Heading class="text-center">NK Dinamo Rajsavac</Heading>
	<PostGrid posts={data.posts} />
	<FootballTable />
</div>