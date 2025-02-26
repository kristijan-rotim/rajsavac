<script lang="ts">
	import FootballTable from '$lib/components/FootballTable.svelte';
	import PostGrid from '$lib/components/PostGrid.svelte';
	import type { Post } from '$lib/types';

	export let data: {
		posts: Post[];
	};
</script>

<div class="space-y-16 pt-16">
	<PostGrid posts={data.posts} />
	<FootballTable />
</div>