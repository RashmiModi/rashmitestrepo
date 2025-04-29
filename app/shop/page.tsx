'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [priceFilter, setPriceFilter] = useState<number>(10000);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/productlist');
      const data: Product[] = await res.json();
      setProducts(data);
      setFilteredProducts(data);

      const uniqueCategories = Array.from(
        new Set(data.map((p) => p.category.categoryName))
      );
      setCategories(['All', ...uniqueCategories]);

      const highestPrice = Math.max(...data.map((p) => p.price));
      setMaxPrice(highestPrice);
      setPriceFilter(highestPrice);
      setHasMounted(true);
    };

    fetchProducts();
  }, []);

  // Separate filtering useEffect
  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (p) => p.category.categoryName === selectedCategory
      );
    }

    filtered = filtered.filter((p) => p.price <= priceFilter);

    setFilteredProducts(filtered);
  }, [selectedCategory, priceFilter, products]);

  if (!hasMounted) return null;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-8 justify-center">
        <select
          className="p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'All' ? 'All Categories' : category}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <label className="font-medium">Max Price: ₹{priceFilter}</label>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceFilter}
            onChange={(e) => setPriceFilter(Number(e.target.value))}
            className="w-48"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="w-70 h-100 bg-white shadow-md rounded-lg overflow-hidden">
            <Image
              src={product.productimageUrl}
              alt={product.productname}
              className="w-full h-48 object-cover" width={20} height={20}
            />
            <div className="p-4 flex justify-between items-start gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{product.productname}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-lg font-bold mt-2">₹{product.price}</p>
                <p className="text-sm italic text-gray-400 mt-1">
                  Category: {product.category.categoryName}
                </p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <p className="text-sm text-gray-500">Color: {product.color}</p>
                <p className="text-sm text-gray-500">Size: {product.size}</p>
                <a
    href={`/product/${product.id}`}
    className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  >
    View Details
  </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
