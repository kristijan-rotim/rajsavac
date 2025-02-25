<script lang="ts">
	import { Carousel, Heading } from 'flowbite-svelte';
	import PostGrid from '../lib/components/PostGrid.svelte';
	import type { CarouselImages, Post } from '$lib/types';
	import FootballTable from '$lib/components/FootballTable.svelte';

	export let data: {
		posts: Post[];
		carouselImages: CarouselImages[];
	};
</script>

<div class="max-w-4xl">
	<Carousel images={data.carouselImages.map(img => ({ src: img.src, alt: img.alt }))} let:Indicators>
		<Indicators />
	</Carousel>
</div>

<div class="pt-16">
	<FootballTable />
</div>

<div class="pt-16 text-center">
	<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold md:text-5xl lg:text-6xl">Novosti</Heading>
	<PostGrid posts={data.posts} />
</div>
