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
    const [pageLastEvaluatedKeys, setPageLastEvaluatedKeys] = useState<
        (string | undefined)[]
    >([undefined]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const last = pageLastEvaluatedKeys[currentPage];
        console.log("last", last);
        const url = new URL(
            `https://ml1bmq18u9.execute-api.us-east-1.amazonaws.com${
                last ? `?lastEvaluatedKey=${last}` : ""
            }`
        );
        fetch(url).then((response) => {
            response.json().then((data) => {
                setPictures(data);
            });
        });
    }, [currentPage, pageLastEvaluatedKeys]);

    const nextPage = () => {
        const newPages = [...pageLastEvaluatedKeys];
        newPages.push(pictures[pictures.length - 1].id);
        setPageLastEvaluatedKeys(newPages);
        setCurrentPage((prev) => prev + 1);
    };

    const previousPage = () => {
        const newPages = [...pageLastEvaluatedKeys];
        newPages.pop();
        setPageLastEvaluatedKeys(newPages);
        setCurrentPage((prev) => prev - 1);
    };

    const handleDelete = (id: string) => {
        fetch(
            `https://ml1bmq18u9.execute-api.us-east-1.amazonaws.com?id=${id}`,
            {
                method: "DELETE",
            }
        ).then(() => {
            setPictures(pictures.filter((item) => item.id !== id));
        });
    };

    return (
        <>
            <div>
                {currentPage > 0 ? (
                    <button
                        onClick={previousPage}
                        className="px-4 py-2 rounded-md cursor-pointer hover:underline"
                    >
                        Previous
                    </button>
                ) : null}
                {pictures.length >= 20 ? (
                    <button
                        onClick={nextPage}
                        // disabled={currentPage === pages.length - 1}
                        className="px-4 py-2 rounded-md cursor-pointer hover:underline"
                    >
                        Next
                    </button>
                ) : null}
            </div>
            <section className="w-full flex flex-wrap justify-center items-center gap-6">
                {pictures.map((item) => {
                    const createdAt = new Date(
                        item.createdAt
                    ).toLocaleDateString();
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
                            <section className="p-4 flex flex-col">
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">
                                        {item.name}
                                    </span>
                                    <span className="text-gray-400">
                                        {createdAt}
                                    </span>
                                </div>
                                <span className="text-wrap">
                                    {item.description}
                                </span>
                                <span
                                    className="mt-4 text-red-500 cursor-pointer hover:underline"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </span>
                            </section>
                        </div>
                    );
                })}
            </section>
        </>
    );
}
