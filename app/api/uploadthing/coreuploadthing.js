import { createUploadthing} from "uploadthing/next";
const f = createUploadthing();

export const ourFileRouter = {

imageUploader: f({ image: { maxFileSize: "4MB" } })
.onUploadComplete(async ({ file }) => {
console.log("file url", file.ufsUrl);
const url= file.ufsUrl
return {message:"uploaded image with URL :",url};
}),
pdfUploader: f({ pdf: { maxFileSize: "4MB"} })
.onUploadComplete(async ({ file }) => {
console.log("file url", file.ufsUrl);
return { message:'Pdf Upload Complete' };
}),
videoUploader: f({ video: { maxFileSize: "4MB" } })
.onUploadComplete(async ({ file }) => {
console.log("file url", file.ufsUrl);
return { message:'Video Upload Complete'};
}),
} ;

export default ourFileRouter ;