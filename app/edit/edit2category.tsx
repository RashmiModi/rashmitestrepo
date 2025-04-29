'use server';

import { PrismaClient } from "@prisma/client";
//import { getCategory } from "./editnewcatdb";

const prisma = new PrismaClient()

//console.log("formdata from edit form : ",formData);
type EditCategoryData = {
  category: string;
};
      
export async function editCategory (catid:number,formData:EditCategoryData) {
 const id =Number(catid)
  console.log("id in edit2 file for updating records-->",id);
const name=  formData.category
  await prisma.category.update({
        where: {
          catid: id, 
        },
        data: {
          categoryName:name,
        },
      });
    
     console.log("ID------>",id, name);
      //console.log("Name------>",categoryName);
      //console.log("updatedcat------>",updatedcat);
   

}
          
  
  

