"use server";

import { PrismaClient } from '@prisma/client'
import  Link  from 'next/link';
import { Key, Pencil} from 'lucide-react'
import { Trash } from 'lucide-react';
//import { deleteCategory } from '../delete/deletecategory';
const Category =async () => { 
  const categoryAll=await getAllCategory();
    return (
      <div>
       { /*
        <form action={createProduct} className="flex flex-col gap-4">

        <h1>Create Product Category</h1>
     
        <label> Product Category : </label>
        <input type="text" id="productcategory" name="productcategory" placeholder="category....."></input>
        <button>Create Category</button>

        </form> 
        */}
        <form action={createProduct} className="w-full max-w-sm">
  <div className="flex items-center border-b border-teal-500 py-2 ">

    <input id="productcategory" name="productcategory" placeholder="category....." className="appearance-none bg-transparent border-2 border-indigo-600 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text"></input>
    <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
    Create Category
    </button>
    <button className="flex-shrink-0 border-transparent border-4 text-white-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="reset">
      Cancel
    </button>
  </div>
</form>
 
<Link href="/create" className='btn btn-primary'> Add</Link>
<div className='my-sm-5 w-2/5 h-1/10 '>
{ categoryAll.map((cat)=>( <div key={cat.catid} className=" p-4 border rounded-md shadow-sm bg-white flex  py-4">

  <span className='font-medium text-grey-800 '> {cat.catid}</span>
  &nbsp;<span className='font-medium text-grey-800 ml-12'> {cat.categoryName}</span>
  <div className='btn btn-primary btn-sm ms-100 mr-3'>

  <Link href={{ pathname: "/edit/id ", query: { id: cat.catid } }} className='btn btn-primary btn-sm ms-100 mr-2'> <Pencil/>Edit</Link>
  <Link href={{ pathname: "/delete/id ", query: { id: cat.catid } }} className="btn btn-error"><Trash/>Delete</Link>
  
  </div>
  </div>))
} 
</div> </div> 
    );
  };
  //href={{ pathname: "/delete/id ", query: { id: cat.catid } }}
  console.log(Key);
  export default Category;

  const prisma = new PrismaClient()
  
  export const createProduct=async(data:FormData) =>{
  
      const formcategory= Object.fromEntries(data.entries());
          
      await prisma.category.create({
        data: {
          categoryName: formcategory.productcategory as string,
        },
      });        
  console.log({formcategory});
  }  
   
export const getAllCategory=async()=>{
return await prisma.category.findMany()

  }




 
  