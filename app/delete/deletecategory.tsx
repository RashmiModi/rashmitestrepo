'use server';

import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

//console.log("formdata from edit form : ",formData);
type DeleteCategoryData = {
  catid: number;
};
      
export async function deleteCategory (catid:DeleteCategoryData) {
 const id =Number(catid)
  console.log("id in delete file for updating records-->",id);
  try {
   await prisma.category.delete({
    where: {
      catid: id, // or any specific id
    },

    
  });
} catch (error) {
    console.error('Error deleting category:', error);
  }
    
     console.log("ID------to delete>",id);
      //console.log("Name------>",categoryName);
      //console.log("updatedcat------>",updatedcat);
   return id;

}
          
  
  

