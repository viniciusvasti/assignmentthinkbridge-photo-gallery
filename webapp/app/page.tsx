import { Button } from "@/components/ui/button";
import Link from "next/link";
import PictureList from "@/components/pictureList";

export default async function Home() {
    return (
        <>
            <Link href="/pictures/new">
                <Button variant="outline">Add a beautiful picture</Button>
            </Link>

            <PictureList />
        </>
    );
}
