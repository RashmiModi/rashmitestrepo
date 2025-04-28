'use client';
import { ForminputPost } from '@/types';
import React, { FC } from 'react'
import {SubmitHandler, useForm } from 'react-hook-form'
interface formpostprops{
    submit: SubmitHandler<ForminputPost>;
    isEditing:boolean;
}
const FormPost:FC<formpostprops>=({submit,isEditing})=> {
    const{register, handleSubmit}=useForm<ForminputPost>();
   
  return (
    
    <form onSubmit={handleSubmit(submit)} className='flex flex-colitems-center justify-center gap-5 mt-10'>
<input type='hidden' {...register("catid")}  id='catid'></input> 
<input type='text' placeholder='type here!!' id='category' {...register("category")} className='input input-bordered w-full max-w-xs'></input>
<button  className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
   {isEditing?'Update':'Create'}
    </button>
    <button className="flex-shrink-0 border-transparent border-4 text-white-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="reset">
      Cancel
    </button>
    </form>
  )
}



export default FormPost;