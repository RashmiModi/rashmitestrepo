'use server';

import { PrismaClient } from "@prisma/client";
type AddCategoryData = {
  category: string;
};
const prisma = new PrismaClient()
export const addCategory=async(data: AddCategoryData) =>{
   await prisma.category.create({
                data:{
                  categoryName :data.category,
                }
             })
  };