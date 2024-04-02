import * as zod from 'zod';

export const pictureCreateSchema = zod.object({
    name: zod.string(),
    description: zod.string().optional(),
    imageFileName: zod.string(),
});

export const pictureDeleteSchema = zod.object({
    id: zod.string(),
});

export const pictureListSchema = zod.object({
    lastEvaluatedKey: zod.string().optional(),
});
