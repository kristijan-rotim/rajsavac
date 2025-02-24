import { env } from '$env/dynamic/public';
import { pb } from '$lib';
import { Cache } from '$lib/cache';

const ttl = env.PUBLIC_CACHE_TIME;

const postsCache = new Cache<any>(parseInt(ttl));
const CACHE_KEY = 'all_posts';

export const load = async () => {
	const cachedPosts = postsCache.get(CACHE_KEY);

	if (cachedPosts) return { posts: cachedPosts };

	try {
		const result = await pb.collection('posts').getList(1, 6, { sort: '-updated' });

		const posts = result.items.map((post) => {
			if (!post.cover) return { ...post, image: '/placeholder.png' };

			const imageUrl = `/api/images/${post.collectionId}/${post.id}/${post.cover}`;

			return {
				...post,
				image: imageUrl
			};
		});

		const processedPosts = structuredClone(posts);

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
