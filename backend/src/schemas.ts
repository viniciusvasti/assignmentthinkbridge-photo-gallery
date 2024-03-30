import * as zod from 'zod';

export const pictureCreateSchema = zod.object({
    name: zod.string(),
    description: zod.string().optional(),
    imageUrl: zod.string().url(),
});

export const pictureDeleteSchema = zod.object({
    id: zod.string(),
});
