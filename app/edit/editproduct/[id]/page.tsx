'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ImageUpload from "@/components/ImageUpload";


export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // get id from query param
  const [categories, setCategories] = useState<{ id: string, categoryName: string }[]>([]);

  const [form, setForm] = useState({
    productname: '',
    description: '',
    color: '',
    size: '',
    price: '',
    productimageUrl: '',
    catid: '',
  });

  // 🔄 Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/product/${id}`);
      const data = await res.json();
      setForm({
        ...data,
        catid: data.category?.id ?? '', // ensure `catid` is filled
      });
      
    };

    const fetchCategories = async () => {
      const res = await fetch(`/api/category`);
      const data = await res.json();
      setCategories(data);
    };

    if (id) {
      fetchProduct();
      fetchCategories();
    }
  }, [id]);


  const handleChange = (e:any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const res = await fetch(`/api/product/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Product updated!');
      router.push('/'); // redirect to product list
    } else {
      alert('Error updating product.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="productname" value={form.productname} onChange={handleChange} placeholder="Name" className="input" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input" />
        <input name="color" value={form.color} onChange={handleChange} placeholder="Color" className="input" />
        <input name="size" value={form.size} onChange={handleChange} placeholder="Size" className="input" />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="input" />
        <input name="productimageUrl" value={form.productimageUrl} onChange={handleChange} placeholder="Image URL" className="input" />
      
         {/* 🔽 Category Dropdown */}
         <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="catid"
            value={form.catid}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* 📷 Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Product Image</label>
          <div className="mt-4">
            <ImageUpload onImageUpload={(url) => setForm(prev => ({ ...prev, productimageUrl: url }))} />
          </div>
        </div>

        
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
