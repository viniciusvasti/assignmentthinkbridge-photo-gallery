import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png"];

export const pictureFormSchema = z.object({
    image: z.any().refine((file) => {
        if (!file) return false;
        const fileExtension = file.split(".").pop();
        return ACCEPTED_IMAGE_TYPES.includes(fileExtension);
    }, "Only .jpg, .jpeg, and .png formats are supported."),
    name: z.string().min(3).max(50),
    description: z.string().min(3).max(255).optional(),
});
