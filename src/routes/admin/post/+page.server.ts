import { pb } from '$lib/index';
import type { Actions } from './$types';

export const actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        const coverFile = formData.get('cover') as File;

        try {
            const pbFormData = new FormData();
            pbFormData.append('title', formData.get('title') as string);
            pbFormData.append('cover', coverFile);
            pbFormData.append('shortDescription', formData.get('shortDescription') as string);

            const record = await pb.collection('posts').create(pbFormData);

            return {
                success: true,
                data: record
            };
        } catch (err) {
            console.error('Error creating post:', err);
            return {
                success: false,
                error: 'Failed to create post'
            };
        }
    }
} satisfies Actions;