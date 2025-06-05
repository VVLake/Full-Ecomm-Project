import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import CategoryFilter from '../components/CategoryFilter';

const fetchProducts = async () => {
  const res = await axios.get('https://fakestoreapi.com/products');
  return res.data;
};

const fetchProductsByCategory = async (category) => {
  const res = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
  return res.data;
};

const Home = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ['products', category],
    queryFn: () => (category ? fetchProductsByCategory(category) : fetchProducts()),
    keepPreviousData: true,
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (productsLoading) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;
  if (productsError) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Error loading products</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>🛍️ Product Catalog</h1>
      <CategoryFilter value={category} onChange={setCategory} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '2rem', justifyContent: 'center' }}>
        {products?.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '1rem', width: '250px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
            <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1rem', height: '3rem', overflow: 'hidden' }}>{product.title}</h3>
            <p style={{ fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>
            <button
              onClick={() => handleAddToCart(product)}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
