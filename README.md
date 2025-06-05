# 🛒 E-Commerce Store with React, Redux Toolkit & FakeStoreAPI

## Overview
This project is a React-based e-commerce application that showcases a product catalog, category filtering, a shopping cart with Redux Toolkit state management, and a checkout feature. It integrates with the FakeStoreAPI for product data.

## 🚀 Features

### Product Catalog
- Uses React Query to fetch all products from FakeStoreAPI.
- Displays product title, price, category, description, rating, and image.
- Each product includes an "Add to Cart" button.

### Category Navigation
- Dynamically fetches product categories from FakeStoreAPI.
- Provides a dropdown to filter products by selected category.

### Shopping Cart
- Uses Redux Toolkit to manage cart state: adding, updating quantity, and removing products.
- Displays cart items with title, image, quantity, and price.
- Allows quantity adjustment directly in the cart.
- Removes items individually or clears the entire cart.
- Persists cart state in sessionStorage across sessions.

### Checkout Functionality
- Simulates checkout by clearing cart state and sessionStorage.
- Provides visual feedback upon successful checkout.

## Technologies Used
- React
- Redux Toolkit
- React Query
- Axios
- FakeStoreAPI
- Session Storage

## Setup & Run
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm start` to launch the app in development mode.
4. Open `http://localhost:3000` in your browser.

## Project Structure
- src/
  - components/
    - CategoryFilter.jsx
    - ProductCard.jsx
  - features/
    - cart/
      - cartSlice.js
  - pages/
    - Home.jsx
    - ShoppingCart.jsx
    - Checkout.jsx
  - utils/
    - sessionStorage.js
  - App.jsx
  - main.jsx


## 🔥 Deployment Suggestions

- Deploy easily with [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [Render](https://render.com).
- Ensure the `homepage` field is added to your `package.json` if using GitHub Pages.
- Follow the deployment guides provided by the respective platforms for seamless hosting.

Ensure the homepage field is added to your package.json if using GitHub Pages

## Notes
- The checkout process is simulated as the FakeStoreAPI does not support real order processing.
- Cart data persists in sessionStorage for a smooth user experience.

---

Thank you for checking out the project!

---

Author: Valeria Lake [Linkedin:] (www.linkedin.com/in/valerialake95)

