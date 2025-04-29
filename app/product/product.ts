import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body on product page ---->>", body);

    const { productname, description, price, catid, productimageUrl, color, size } = body;

    console.log("before create function.!!");

    const product = await prisma.product.create({
      data: {
        productname,
        description,
        price: parseFloat(price),
        color,
        size,
        productimageUrl,
        category: {
          connect: {
            catid: parseInt(catid),
          },
        },
      },
    });

    console.log("Product created successfully:", product);

    return NextResponse.json({ message: "Product created successfully", product }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: 'Error creating product', error: (error as Error).message }, { status: 500 });
  }
}
