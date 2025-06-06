import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fetchUserOrders } from '../utils/orderService';

const OrderHistory = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            setLoading(true);
            try {
                const data = await fetchUserOrders(user.email);
                setOrders(data);
            } catch (err) {
                setError('Failed to load orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) return <div>Loading orders...</div>;
    if (!user) return <div>Please log in to see your order history.</div>;
    if (error) return <div>{error}</div>;
    if (orders.length === 0) return <div>No orders found.</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
            <h2>Your Order History</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {orders.map(order => (
                    <li
                        key={order.id}
                        style={{
                            border: '1px solid #ccc',
                            marginBottom: '1rem',
                            padding: '1rem',
                            cursor: 'pointer',
                            backgroundColor: selectedOrder?.id === order.id ? '#f0f8ff' : 'white',
                        }}
                        onClick={() => setSelectedOrder(order)}
                    >
                        <strong>Order ID:</strong> {order.id} <br />
                        <strong>Date:</strong>{' '}
                        {order.createdAt?.toDate
                            ? order.createdAt.toDate().toLocaleString()
                            : 'Unknown'}{' '}
                        <br />
                        <strong>Total:</strong> ${order.totalPrice?.toFixed(2) || '0.00'}
                    </li>
                ))}
            </ul>

            {selectedOrder && (
                <div style={{ marginTop: '2rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
                    <h3>Order Details</h3>
                    <button onClick={() => setSelectedOrder(null)}>Close Details</button>
                    <ul>
                        {selectedOrder.products?.map((product, index) => (
                            <li key={index}>
                                {product.title} - ${product.price.toFixed(2)} x {product.quantity || 1}
                            </li>
                        ))}
                    </ul>
                    <p>
                        <strong>Total Price: </strong>${selectedOrder.totalPrice?.toFixed(2) || '0.00'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
