import { db } from '../firebaseConfig'; 
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from 'firebase/firestore';

// Place an order in Firestore
export const placeOrder = async (orderData) => {
    try {
        const ordersCollection = collection(db, 'orders');
        const docRef = await addDoc(ordersCollection, {
            ...orderData,
            createdAt: serverTimestamp(), // Firestore server timestamp
        });
        return docRef.id;
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
};

// Fetch all orders for a specific user by email
export const fetchUserOrders = async (userEmail) => {
    try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userEmail', '==', userEmail), orderBy('createdAt', 'desc'));

        const querySnapshot = await getDocs(q);
        const orders = [];
        querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() });
        });
        return orders;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
};
