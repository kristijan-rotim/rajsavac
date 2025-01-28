import { DB_URL } from '$env/static/private';
import { pb } from '$lib';
import { Cache } from '$lib/cache';

const imageUrlCache = new Map<string, string>();
const postsCache = new Cache<any>(300); // 5 minutes cache
const CACHE_KEY = 'all_posts';

export const load = async () => {
	// Try to get from cache first
	const cachedPosts = postsCache.get(CACHE_KEY);
	if (cachedPosts) {
		console.log('cached posts', cachedPosts);
		return {
			posts: cachedPosts
		};
	}

	try {
		const resultList = await pb.collection('posts').getList(1, 50, {
			sort: '-created'
		});

		const postsWithImages = resultList.items.map((post) => {
			if (!post.cover) return { ...post, image: null };

			const cacheKey = `${post.id}-${post.cover}`;

			if (!imageUrlCache.has(cacheKey)) {
				const imageUrl = `${DB_URL}/api/files/${post.collectionId}/${post.id}/${post.cover}`;
				imageUrlCache.set(cacheKey, imageUrl);
			}

			return {
				...post,
				image: imageUrlCache.get(cacheKey)
			};
		});

		const processedPosts = structuredClone(postsWithImages);

		// Store in cache
		postsCache.set(CACHE_KEY, processedPosts);

		return {
			posts: processedPosts
		};
	} catch (err) {
		console.error('Error fetching records:', err);
		return {
			posts: []
		};
	}
};
