'use client';
import { useEffect, useState } from 'react';
import { Key, Pencil} from 'lucide-react'
import { Trash } from 'lucide-react';
import  Link  from 'next/link';
type Product = {
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
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  console.log("product page------------>");
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/productlist');
      const data = await res.json();
      console.log("product list data pm page.tsx ---->",data);
      setProducts(data);
    };

    fetchProducts();
  }, []);
  console.log("finallly product fetched------------>");


  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>


      <a href='/product'>
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-1000 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
<span className="sr-only">Add</span>
&nbsp;&nbsp;ADD NEW PRODUCT
</button>
</a>
      <div className="  mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="w-70 h-100 bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={product.productimageUrl}
              alt={product.productname}
              className=" flex justify-center items-center w-40 h-50 object-cover"
            />
            <div className="p-4 flex justify-between items-start gap-4">
            <div className="flex-1">
    <h2 className="text-xl font-semibold">{product.productname}</h2>
    <p className="text-gray-600">{product.description}</p>
    <p className="mt-2 text-sm text-gray-500">Color: {product.color}</p>
    <p className="text-sm text-gray-500">Size: {product.size}</p>
    <p className="text-lg font-bold mt-2">₹{product.price}</p>
    <p className="text-sm italic text-gray-400 mt-1">
      Category: {product.category.categoryName}
    </p>
  </div>

  {/* Right Column: Action Buttons */}
  <div className="flex flex-col gap-2 items-end">
    
    <Link
      href={{ pathname: "/edit/editproduct/id", query: {id:product.id} }}
      className="btn btn-primary btn-sm"
    >
      <Pencil /> Edit
    </Link>
    <button
  onClick={async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("product ID--->>>",product.id)
      const res = await fetch(`/api/productdelete/${product.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== product.id));
      } else {
        alert("Failed to delete product");
      }
    }
  }}
  className="btn btn-error flex items-center gap-1 text-red-600"
>
  <Trash /> Delete
</button>
  </div>
           
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
