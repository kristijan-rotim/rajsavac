import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const [postsResponse, carouselResponse] = await Promise.all([
			fetch('/api/post'),
			fetch('/api/carousel')
		]);

		const [postsData, carouselData] = await Promise.all([
			postsResponse.json(),
			carouselResponse.json()
		]);

		return {
			posts: postsData?.posts,
			carouselImages: carouselData?.carousel
		};
	} catch (err) {
		console.error('Error fetching data:', err);
		return {
			posts: [],
			carouselImages: []
		};
	}
};
