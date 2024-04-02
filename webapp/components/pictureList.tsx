"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Picture = {
    id: string;
    name: string;
    description: string;
    imageFileName: string;
    createdAt: string;
    imageUrl: string;
};

export default function PictureList() {
    const [pictures, setPictures] = useState<Picture[]>([]);
    useEffect(() => {
        fetch("https://vkdcla28i9.execute-api.us-east-1.amazonaws.com").then(
            (response) => {
                response.json().then((data) => {
                    setPictures(data);
                });
            }
        );
    }, []);

    return (
        <section className="w-full flex flex-wrap justify-center items-center gap-6">
            {pictures.map((item) => {
                const createdAt = new Date(item.createdAt).toLocaleDateString();
                return (
                    <div
                        key={item.id}
                        className="w-full sm:max-w-[280px] bg-white rounded-2xl shadow-sm"
                    >
                        <Image
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full rounded-xl"
                            width={280}
                            height={280}
                        />
                        <section className="p-4">
                            <div className="flex justify-between mb-2">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-gray-400">
                                    {createdAt}
                                </span>
                            </div>
                            <span className="text-wrap">
                                {item.description}
                            </span>
                        </section>
                    </div>
                );
            })}
        </section>
    );
}
