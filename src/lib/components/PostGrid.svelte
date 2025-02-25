<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import type { Post } from '$lib/types';

	export let posts: Post[];
</script>

<style>
    .description {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
    }

    @media (max-width: 640px) {
        .description {
            max-width: 50ch;
        }
    }

    @media (min-width: 641px) and (max-width: 768px) {
        .description {
            max-width: 100ch;
        }
    }

    @media (min-width: 769px) {
        .description {
            max-width: 150ch;
        }
    }
</style>

{#if posts.length > 0}
	<div class="mx-auto w-[70vw]">
		<div class="grid grid-cols-1 gap-6 pb-8 md:grid-cols-2 lg:grid-cols-3">
			{#each posts as post}
				<Card class="h-[500px] w-full !max-w-none">
					{#if post.image}
						<img
						  class="h-64 w-full rounded-t-lg object-cover"
						  src={`${post.image}`}
						  alt={post.title}
						/>
					{/if}
					<h5 class="p-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{post.title}
					</h5>
					<p class="description p-4 font-normal text-gray-700 dark:text-gray-400">
						{post.shortDescription}
					</p>
					<Button class="mt-auto w-fit">
						Procitaj vise
						<ArrowRightOutline class="ms-2 h-6 w-6 text-white" />
					</Button>
				</Card>
			{/each}
		</div>
	</div>
{:else}
{/if}
<div class="p-8 text-center">
	<p class="text-xl text-gray-600">Loading posts...</p>
</div>