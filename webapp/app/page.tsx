import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Link href="/pictures/new">
                <Button variant="outline">Add a beautiful picture</Button>
            </Link>

            <section className="flex flex-wrap justify-center items-center gap-6">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
                    (item) => (
                        <div
                            key={item}
                            className="w-full sm:max-w-[280px] bg-white rounded-2xl shadow-sm"
                        >
                            <Image
                                src="/pic.jpg"
                                alt="Vercel Logo"
                                className="w-full rounded-xl"
                                width={280}
                                height={280}
                            />
                            <section className="p-4">
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">
                                        Image Name
                                    </span>
                                    <span className="text-gray-400">
                                        2023-10-25
                                    </span>
                                </div>
                                <span className="text-wrap">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Sit repellat labore
                                    doloribus laboriosam consectetur eveniet, ex
                                    quam, sequi nam officiis tempora,
                                    consequatur cumque. Atque dolore
                                    necessitatibus unde ipsam, quo esse.
                                </span>
                            </section>
                        </div>
                    )
                )}
            </section>
        </>
    );
}
