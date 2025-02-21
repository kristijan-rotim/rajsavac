<script lang="ts">
	import { Carousel, Heading } from 'flowbite-svelte';
	import PostGrid from '../lib/components/PostGrid.svelte';
	import type { Post } from '$lib/types';

	export let data: {
		posts: Post[];
	};

	let images = [
		{
			alt: 'First slide',
			src: 'https://flowbite.com/docs/images/carousel/carousel-1.svg'
		},
		{
			alt: 'Second slide',
			src: 'https://flowbite.com/docs/images/carousel/carousel-2.svg'
		},
		{
			alt: 'Third slide',
			src: 'https://flowbite.com/docs/images/carousel/carousel-3.svg'
		}
	];
</script>

<Carousel {images} let:Indicators>
	<Indicators />
</Carousel>

<div class="p-8 text-center">
	<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold md:text-5xl lg:text-6xl">Novosti</Heading>
</div>

<PostGrid posts={data.posts} />
