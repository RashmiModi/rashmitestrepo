import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,     
      },
    });
   // console.log(products);
    console.log("fetched products");
    return NextResponse.json(products);
  } catch (error) {
    console.error('Fetch failed:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

