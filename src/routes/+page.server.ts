import { DB_URL } from '$env/static/private';
import PocketBase from 'pocketbase';

const imageUrlCache = new Map<string, string>();

export const load = async () => {
    const pb = new PocketBase(DB_URL);

    try {
        const resultList = await pb.collection("posts").getList(1, 50, {
            sort: "-created",
        });

        const postsWithImages = resultList.items.map(post => {
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

        return {
            posts: structuredClone(postsWithImages)
        };
    } catch (err) {
        console.error("Error fetching records:", err);
        return {
            posts: []
        };
    }
};