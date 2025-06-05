import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearCart());
    sessionStorage.removeItem('cart');
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (success) {
    return (
      <div style={styles.successContainer}>
        <h2>🎉 Checkout Complete!</h2>
        <p>Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Enter Payment Details</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {[
          { label: 'Name on Card', name: 'name', type: 'text' },
          { label: 'Card Number', name: 'cardNumber', type: 'text', maxLength: 16 },
          { label: 'Expiration Date', name: 'expiration', type: 'text', placeholder: 'MM/YY' },
          { label: 'CVV', name: 'cvv', type: 'text', maxLength: 4 },
        ].map(({ label, name, type, maxLength, placeholder }) => (
          <div key={name} style={styles.formGroup}>
            <label htmlFor={name} style={styles.label}>{label}</label>
            <input
              id={name}
              name={name}
              type={type}
              maxLength={maxLength}
              placeholder={placeholder || ''}
              value={formData[name]}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        ))}

        <button type="submit" style={styles.payButton}>
          Pay Now
        </button>
      </form>

      <div style={styles.cancelButtonContainer}>
      <button
        onClick={handleCancel}
        style={{ marginTop: '1rem', width: '100%', padding: '0.75rem', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem' }}
      >
        Cancel and Go Back to Home
      </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '480px',
    margin: '3rem auto',
    padding: '2rem 2.5rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    marginBottom: '2rem',
    color: '#222',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '1.8rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#555',
    fontSize: '1rem',
  },
  input: {
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    border: '1.5px solid #ccc',
    fontSize: '1rem',
    transition: 'border-color 0.25s ease',
  },
  payButton: {
    marginTop: '2rem',
    padding: '0.85rem',
    backgroundColor: '#4caf50',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '700',
    fontSize: '1.1rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(76,175,80,0.6)',
    transition: 'background-color 0.3s ease',
  },
  cancelButtonContainer: {
    marginTop: '1.5rem',
    textAlign: 'center',
  },
  cancelButton: {
    padding: '0.75rem 2rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(231,76,60,0.6)',
    transition: 'background-color 0.3s ease',
  },
  successContainer: {
    marginTop: '4rem',
    textAlign: 'center',
    color: '#27ae60',
    fontSize: '1.5rem',
    fontWeight: '700',
  }
};

export default CheckoutPage;
