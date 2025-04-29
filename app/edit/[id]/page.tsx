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
    if (catid) {
      const numericCatid = Number(catid); // Convert to number

      if (!isNaN(numericCatid)) {
        const filterdata = getCategory(numericCatid);

        filterdata.then((data) => {
          if (data) {
            const updatedData = {
              catid: numericCatid,
              category: data.categoryName, // Map categoryName to category
            };
            editCategory(numericCatid, updatedData); // Ensure numericCatid is passed as number
          }
        });
      } else {
        console.error('Invalid catid');
      }
    } else {
      console.error('No catid found in URL');
    }
  }, [searchParams, router,catid]);
  const handlecreatecat: SubmitHandler<ForminputPost> = (data) => {
    console.log("form, ID:", catid);
    console.log("form, Category:", data?.category);

    // Ensure catid is a valid number before calling editCategory
    if (catid) {
      const numericCatid = Number(catid);
      if (!isNaN(numericCatid)) {
        editCategory(numericCatid, data);
        router.push('/productcategory');
      } else {
        console.error('Invalid catid');
      }
    }
  };
   return (
    <div><h1 className='text-2xl text-center mb-2'> Edit Category</h1>
   <FormPost submit={handlecreatecat} isEditing={true}></FormPost>
    </div>
  )
}

export default EditPage;
