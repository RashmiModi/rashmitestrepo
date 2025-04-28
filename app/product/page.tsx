'use client';

import ImageUpload from "@/components/ImageUpload";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
type Category = {
  catid: number;
  categoryName: string;
};

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    productname : '',
    description: '',
    color: '',
    size: '',
    price: '',
    catid: '',
    productimageUrl: '',
  });
  const [categories, setCategories] = useState<Category[]>([]);

  
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/productcategory/getcategoryroute');
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, [router]);
  const [selectedSize, setSelectedSize] = useState('S'); // Default value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [message, setMessage] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
console.log("handle submit")
    const res = await fetch('/productcategory/getcategoryroute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        catid: parseInt(form.catid),
       
      }),
    });
 console.log(form.price,form.color,form.productname,form.productimageUrl);
    if (res.ok) {
      alert('Product created successfully!');
      setForm({
        productname: '',
        description: '',
        color: '',
        size: '',
        price: '',
        catid: '',
        productimageUrl: '',
      });

      const data = await res.json();
      setMessage(data.message);
    } else {
      alert('Failed to create product.');
    }
    router.push('/product');
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            name="productname"
            value={form.productname }
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
        
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              name="color"
              value={form.color}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
           
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Size</label>
       

<select
           name="size"
           value={form.size}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
            
          >
            <option value="S" >S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="Xl">Xl</option>
            <option value="XXl">XXl</option>
          </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
             
            />
          </div>

          <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
           name="catid"
           value={form.catid}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
           
          >
            <option value="">Select a category</option>
            {categories.map((data) => (
              <option key={data.catid} value={data.catid}>
                {data.categoryName}
              </option> 
            ))}  
          </select>
        </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image URL</label>
          <div className="mt-4 "><ImageUpload onImageUpload={(url) => setForm(prev => ({ ...prev, productimageUrl: url }))}></ImageUpload></div>
        </div>
        
        <p>{message}</p>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
  

}
