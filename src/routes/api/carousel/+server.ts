import { pb } from '$lib';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { CarouselImages } from '$lib/types';

export const GET: RequestHandler = async () => {
	try {
		const carouselResult = await pb.collection('carousel').getList(1, 3, {
			sort: '-updated'
		});

		const carousel: CarouselImages[] = carouselResult.items
			.map((item): CarouselImages | null => {
				if (!item.image) return null;

				return {
					id: item.id,
					alt: 'carousel image',
					src: `/api/images/${item.collectionId}/${item.id}/${item.image}`
				};
			})
			.filter((item): item is CarouselImages => item !== null);

		return json({ carousel });
	} catch (err) {
		return json([], { status: 500 });
	}
};
