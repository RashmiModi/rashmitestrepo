'use client';
import FormPost from "@/components/formpost";
import { ForminputPost } from "@/types";
import { SubmitHandler } from "react-hook-form";
import { addCategory } from "./addnewdb";


const CreatePage=()=>{
 const handlecreatecat:SubmitHandler<ForminputPost>=(data)=>{
  console.log(data);
  addCategory(data);
  
   };
 


return(
  <div>
  <h1 className="text-2xl my-4 font-bold text-center">Add New category</h1>
  <FormPost submit={handlecreatecat} isEditing={false}></FormPost>
 
  </div>
);
  
};



export default CreatePage;