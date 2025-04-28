import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  //const id =  parseInt(params.id);
  const { id } = await params
  const pid =parseInt(id)
  if (isNaN(pid)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), {
      status: 400,
    });
  }
  const product = await prisma.product.findUnique({
    where: {id: pid },
    include: { category: true },
  });
  if (!product) {
    return new Response(JSON.stringify({ error: 'Product not found' }), {
      status: 404,
    });
  }
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const data = await req.json();
 console.log("product data-->");
  const updated = await prisma.product.update({
    where: { id },
    data:{
      productname:data.productname,
      price:parseInt(data.price),
      description:data.description,
      color:data.color,
      size:data.size,
      productimageUrl:data.productimageUrl,
    
    },
  });

  return NextResponse.json(updated);
}