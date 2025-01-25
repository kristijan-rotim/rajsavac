<script lang="ts">
    import { Card, Button } from "flowbite-svelte";
    import { ArrowRightOutline } from "flowbite-svelte-icons";
    import type { Post } from "$lib/types";

    export let data: {
        posts: Post[];
    };
</script>

<h1 class="text-4xl font-bold mb-6 text-center">Welcome to Rajsavac</h1>

{#if data.posts.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {#each data.posts as post}
            <Card>
                {#if post.image}
                    <img
                        class="w-full h-48 object-cover rounded-t-lg"
                        src={`${post.image}`}
                        alt={post.title}
                    />
                {/if}
                <h5
                    class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-4"
                >
                    {post.title}
                </h5>
                <p class="font-normal text-gray-700 dark:text-gray-400 p-4">
                    {post.shortDescription}
                </p>
                <Button class="w-fit">
                    Procitaj vise <ArrowRightOutline
                        class="w-6 h-6 ms-2 text-white"
                    />
                </Button>
            </Card>
        {/each}
    </div>
{:else}
    <div class="text-center p-8">
        <p class="text-xl text-gray-600">Loading posts...</p>
    </div>
{/if}
