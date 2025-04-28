'use client'
import { useState } from "react"
import { UploadButton } from "../utils/uploadthing"
const ImageUpload = ({ onImageUpload }: { onImageUpload: (url: string) => void }) => {
const [imgUrl, setImgUrl] = useState('')
const [fileName, setFileName] = useState('');
const [progress, setProgress] = useState<number | null>(null);
console.log(imgUrl)
return (
<div className="my-4">
<UploadButton
className="ut-button:bg-slate-600"
endpoint='imageUploader'

onClientUploadComplete={(res) => {
setImgUrl(res[0].ufsUrl)
setFileName(res[0].name); // Show file name
setProgress(100);
 const  imageurl=res[0].ufsUrl;
 onImageUpload(imageurl)
alert('Image uploaded successfully..!!}');
}  

}

onUploadError={(error) => {

alert('ERROR! ${error.message}');
}}
onUploadProgress={(p) => setProgress(p)}
appearance={{
  button({ ready }) {
    return `
      ${ready ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}
      text-white px-4 py-2 rounded transition
    `;
  },
  container: 'flex flex-col items-start space-y-2',
  allowedContent: 'hidden', // hide default text
}}
content={{
  button({ isUploading }) {
    return isUploading && progress !== null
      ? `Uploading... ${progress}%`
      : 'Choose File';
  },
}}
/>
 {/* Display file name and progress */}
 {fileName && (
        <div className="mt-2 text-sm text-gray-600">
          <p> File: <span className="font-medium">{fileName}</span></p>
          <p> Progress: <span className="font-medium">{progress}%</span></p>
        </div>
      )}


</div>
)
}
export default ImageUpload