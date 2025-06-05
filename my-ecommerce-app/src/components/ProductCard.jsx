import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', width: '250px' }}>
      <img
        src={product.image || 'placeholder-image-url.jpg'}
        alt={product.title || 'No title available'}
        style={{ width: '100%', height: '200px', objectFit: 'contain' }}
      />
      <h3>{product.title || 'No title available'}</h3>
      <p><strong>Price:</strong> ${product.price !== undefined ? product.price : 'N/A'}</p>
      <p><strong>Category:</strong> {product.category || 'N/A'}</p>
      <p style={{ height: '60px', overflow: 'hidden' }}>
        {product.description || 'No description available'}
      </p>
      <p>
        <strong>Rating:</strong> {product.rating?.rate !== undefined ? product.rating.rate : 'N/A'} ({product.rating?.count || 0} reviews)
      </p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
