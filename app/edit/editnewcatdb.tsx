'use server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

/*
export const editCategory=async(data:any) =>{
  
     
          
            await prisma.category.create({
                data:{
                  categoryName :data.category,
                }
             })
           
             
          
  
  };

*/
  export const getCategory=async(catid:number) =>{
    const id=Number(catid);
    const info= await prisma.category.findUnique({
    
      where: {
        catid:id,
      },
      
    })
    console.log("editnew->>",info)
    return info;
  };
 

