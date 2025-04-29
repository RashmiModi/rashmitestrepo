import { NextRequest,NextResponse } from 'next/server';
//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient()
import  prisma  from '@/lib/prisma';
export async function GET() {
    try {
      const categories = await prisma.category.findMany({
        select: {
          catid: true,
          categoryName: true,
        },
      });
  const data=  NextResponse.json(categories);
  console.log("data====>",data)
      return NextResponse.json(categories);
      
    } catch (error) {
      console.error('Error fetching categories:', error);
      return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
    }
  }


  

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { productname, description, price, catid, productimageUrl,color,size } = body;
   await prisma.product.create(
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
             catid, // connect by foreign key
           },
         },
       },
     });
  return NextResponse.json({ message: 'Product received', data: body });
}


