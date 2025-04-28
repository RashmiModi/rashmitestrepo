'use client'


import { getCategory } from '../editnewcatdb';
import { useSearchParams,useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { editCategory } from '../edit2category';
import FormPost from "@/components/formpost";
import { ForminputPost } from "@/types";
import { SubmitHandler } from "react-hook-form";
export const EditPage   = () => {
 
  const router = useRouter();
  const searchParams = useSearchParams()
  const catid = searchParams?.get('id') 
  useEffect(() => {
   
    console.log("get id from URL--->",catid);
    const filterdata= getCategory(catid);
    
    console.log("data-----> after getting as per ID",filterdata);
  
  filterdata.then(data => editCategory(data?.catid,data))   
  
  console.log("data has gone in editCategeory()");
}, [searchParams,router]);
const handlecreatecat:SubmitHandler<ForminputPost>=(data)=>{
  console.log("form, ID:",catid);
  console.log("form, ID:",data?.category);
  editCategory(catid,data);
  router.push('/productcategory');
};
   return (
    <div><h1 className='text-2xl text-center mb-2'> Edit Category</h1>
   <FormPost submit={handlecreatecat} isEditing={true}></FormPost>
    </div>
  )
}

export default EditPage;
