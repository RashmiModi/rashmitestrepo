'use server';

import { PrismaClient } from "@prisma/client";
import { getCategory } from "./editnewcatdb";

const prisma = new PrismaClient()

//console.log("formdata from edit form : ",formData);
    
      
export async function editCategory (catid:any,formData:any) {
 const id =Number(catid)
  console.log("id in edit2 file for updating records-->",id);
let name=  formData.category
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
          
  
  

