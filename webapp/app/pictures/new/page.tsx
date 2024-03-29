import PictureForm from "./picture-form";

export default function page() {
    return (
        <div className="w-full flex-1 flex flex-col items-center justify-center">
            <div className="max-sm:w-full sm:min-w-96 flex flex-col items-center bg-gray-100 p-6 rounded-xl shadow-sm">
                <h1 className="mb-8 text-2xl font-normal">
                    Upload a beautiful picture
                </h1>
                <PictureForm />
            </div>
        </div>
    );
}
