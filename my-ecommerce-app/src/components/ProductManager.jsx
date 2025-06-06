import React, { useState } from 'react';
import { addProduct, updateProduct, deleteProduct } from '../utils/productService';

const ProductManager = ({ selectedProduct = null, onClear }) => {
  const [formData, setFormData] = useState({
    title: selectedProduct?.title || '',
    price: selectedProduct?.price || '',
    image: selectedProduct?.image || '',
    category: selectedProduct?.category || '',
    description: selectedProduct?.description || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, formData);
    } else {
      await addProduct(formData);
    }
    onClear();
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      await deleteProduct(selectedProduct.id);
      onClear();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <h3>{selectedProduct ? 'Edit Product' : 'Create Product'}</h3>
      {['title', 'price', 'image', 'category', 'description'].map(field => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={formData[field]}
          onChange={handleChange}
          style={{ display: 'block', margin: '0.5rem 0', padding: '0.5rem' }}
        />
      ))}
      <button type="submit">{selectedProduct ? 'Update' : 'Create'}</button>
      {selectedProduct && <button type="button" onClick={handleDelete}>Delete</button>}
      {selectedProduct && <button type="button" onClick={onClear}>Cancel</button>}
    </form>
  );
};

export default ProductManager;
