'use client'

import { useEffect, useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { use } from 'react'; // ⬅ important

interface Props {
  params: Promise<{ id: string }>; // notice `params` is a Promise now
}

export type Product = {
  id: number;
  productname: string;
  description: string;
  price: number;
  color: string;
  size: string;
  productimageUrl: string;
  category: {
    categoryName: string;
  };
  catid: number;
};

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params); // unwrap params with React.use()
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/product/${parseInt(id)}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found.</div>;
  const handleCheckout = (product: Product) => {
    addToCart(product);
    alert('Product added to cart! Redirecting to checkout...');
    window.location.href = '/checkout'; // redirect to your checkout page
  };
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.productname}</h1>
      <img
        src={product.productimageUrl}
        alt={product.productname}
        className="w-full h-64 object-cover rounded"
      />
      <p className="mt-4 text-lg">{product.description}</p>
      <p className="mt-2 text-xl font-bold">₹{product.price}</p>
      <p className="text-gray-600 mt-1">Color: {product.color}</p>
      <p className="text-gray-600">Size: {product.size}</p>
      <p className="italic text-sm mt-2">Category: {product.category?.categoryName}</p>
     
      <div className="mt-6 flex justify-center gap-4">
  <button
    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={() => addToCart(product)}
  >
    Add to Cart
  </button>
  <button
    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    onClick={() => handleCheckout(product)}
  >
    Checkout
  </button>
</div>

    </div>
  );
}
