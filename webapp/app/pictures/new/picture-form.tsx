"use client";

import React from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { pictureFormSchema } from "@/lib/schemas/picture";
import { createPicture } from "@/lib/actions/pictures.actions";

export default function PictureForm() {
    const router = useRouter();
    const form = useForm<
        z.infer<typeof pictureFormSchema> & {
            serverError: string;
        }
    >({
        resolver: zodResolver(pictureFormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    async function onSubmit(values: z.infer<typeof pictureFormSchema>) {
        try {
            console.log(values);
            const formData = new FormData();
            formData.append("image", values.image);
            formData.append("name", values.name);
            if (values.description) {
                formData.append("description", values.description);
            }
            await createPicture(formData);

            // router.back();
        } catch (error: any) {
            console.error(error);
            form.setError("serverError", {
                type: "custom",
                message: error.message,
            });
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-8"
            >
                <div className="flex-1 flex flex-col gap-3">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Picture
                                    <span className="ml-[1px] text-red-500">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input type="file" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Picture Name
                                    <span className="ml-[1px] text-red-500">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="My beautiful dog"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Picture Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="This is a beautiful dog I adopted from the shelter. He is very playful and loves to run around the park."
                                        rows={4}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <section className="w-full mb-4 flex gap-2">
                    <Button
                        className="w-1/2"
                        type="button"
                        variant="ghost"
                        disabled={form.formState.isSubmitting}
                        onClick={() => router.back()}
                    >
                        Voltar
                    </Button>
                    <Button
                        className="w-1/2"
                        type="submit"
                        disabled={
                            form.formState.isSubmitting ||
                            !form.formState.isDirty
                        }
                    >
                        {form.formState.isSubmitting ? (
                            <>Uploading Picture...</>
                        ) : (
                            <>Upload Picture</>
                        )}
                    </Button>
                </section>
            </form>
        </Form>
    );
}
