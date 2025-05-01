import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: NextRequest, {params}: {params: Promise<{ id: string }>}) {
  const { id } = await params
   const pid =parseInt(id) // ✅ Corrected line

  if (isNaN(pid)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  try {
    await prisma.product.delete({
      where: { id:pid },
    });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ message: 'Failed to delete product' }, { status: 500 });
  }
}
