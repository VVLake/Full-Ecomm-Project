// src/utils/productService.js
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from 'firebase/firestore';
  import { db } from '../firebaseConfig';
  
  // Reference to the "products" collection
  const productsRef = collection(db, 'products');
  
  // Fetch all products
  export const fetchAllProducts = async () => {
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };
  
  // Fetch a single product by ID
  export const fetchProductById = async (productId) => {
    const productDoc = await getDoc(doc(db, 'products', productId));
    return productDoc.exists() ? { id: productDoc.id, ...productDoc.data() } : null;
  };

  
  // Create a new product
  export const addProduct = async (productData) => {
    const newProductRef = await addDoc(productsRef, productData);
    return newProductRef.id;
  };
  
  // Update an existing product
  export const updateProduct = async (productId, updatedData) => {
    await updateDoc(doc(db, 'products', productId), updatedData);
  };
  
  // Delete a product
  export const deleteProduct = async (productId) => {
    await deleteDoc(doc(db, 'products', productId));
  };
  