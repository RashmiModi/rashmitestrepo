import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select: {  catid: true, categoryName: true },
    });
    console.log(NextResponse.json(categories));
    return NextResponse.json(categories);

  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
  }
}
