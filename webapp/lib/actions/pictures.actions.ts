// "use server";
// import * as path from "path";
// import * as fs from "fs";

// export async function createPicture(formData: FormData) {
//     // const name = formData.get("name") as string;
//     // const description = formData.get("description") as string;
//     // const date = new Date();
//     // const imageFileName = formData.get("image") as string;
//     const imageFile = formData.get("file") as File;


//     async function saveImageToServer(imageFile: File) {
//         const imageFilePath = path.join(__dirname, `${imageFile.name}`);
//         const imageBuffer = await imageFile.arrayBuffer();
//         fs.writeFileSync(imageFilePath, Buffer.from(imageBuffer));
//     }

//     await saveImageToServer(imageFile);
// }