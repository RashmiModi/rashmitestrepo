

import { NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';
    export async function POST(req: Request) {
      const body = await req.json();
     
      console.log("body on product page---->>",body)
    const { productname, description, price, catid, productimageUrl,color,size } = body;

    try {
      
      console.log("before create function.!!");
      const addCategory=async(data:any) =>{
      const product = await prisma.product.create(
     { 
        data: {
          productname,
          description,
          price: parseFloat(price),
          
          color,
          size,
          productimageUrl, // Save the image URL
          
          category: {
            connect: {
              catid: parseInt(catid), // connect by foreign key
            },
          },
        },
      });
      
      console.log("inserted data",product);
    return NextResponse.json(product, { status: 201 });
      }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

/*

'use server';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
console.log("before create function.!!");
export const addCategory=async(data:any) =>{
  const product= await prisma.product.create({
    data: {
      productname:data.productname,
      description:data.description,
      price: parseFloat(data.price),
      
      color:data.color,
      size:data.size,
      productimageUrl: data.imageUrl, // Save the image URL
      
      category: {
        connect: {
          catid: parseInt(data.catid), // connect by foreign key
        },
      },
    },
             })
             console.log("inserted data",product);
  };*/