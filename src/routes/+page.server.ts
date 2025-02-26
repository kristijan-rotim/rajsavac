import { env } from '$env/dynamic/public';
import { pb } from '$lib';
import { Cache } from '$lib/cache';
import type { PageLoad } from '../../.svelte-kit/types/src/routes/admin/$types';

const ttl = env.PUBLIC_CACHE_TIME;

const pageCache = new Cache<any>(1);
const CACHE_KEY = 'page_data';

export const load: PageLoad = async () => {
	const cachedData = pageCache.get(CACHE_KEY);

	if (cachedData) return cachedData;

	try {
		const result = await pb.collection('posts').getList(1, 6, { sort: '-updated' });
		const carouselResult = await pb.collection('carousel').getList(1, 3, { sort: '-updated' });

		const posts = result.items.map((post) => {
			if (!post.cover) return { ...post, cover: '/placeholder.png' };

			const imageUrl = `/api/images/${post.collectionId}/${post.id}/${post.cover}`;

			return {
				...post,
				cover: imageUrl
			};
		});

		const carouselImages = carouselResult.items
			.map((item) => {
				if (!item.image) return null;

				return {
					alt: 'test',
					src: `/api/images/${item.collectionId}/${item.id}/${item.image}`
				};
			})
			.filter(Boolean);

		const pageData = {
			posts: structuredClone(posts),
			carouselImages
		};

		pageCache.set(CACHE_KEY, pageData);

		return pageData;
	} catch (err) {
		console.error('Error fetching records:', err);
		return {
			posts: [],
			carouselImages: []
		};
	}
};
