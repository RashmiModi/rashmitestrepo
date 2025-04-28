import { ourFileRouter } from "@/app/api/uploadthing/coreuploadthing";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";


    export const UploadButton = generateUploadButton();
    export const UploadDropzone = generateUploadDropzone();