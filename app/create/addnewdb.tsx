'use server';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export const addCategory=async(data:any) =>{
   await prisma.category.create({
                data:{
                  categoryName :data.category,
                }
             })
  };