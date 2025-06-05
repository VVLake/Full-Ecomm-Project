import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Home from './pages/Home';
import ShoppingCart from './components/ShoppingCart';
import CheckoutPage from './pages/CheckoutPage';
import { saveCartToSession } from './utils/sessionStorage';
import './App.css';

function App() {
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    saveCartToSession(cartItems);
  }, [cartItems]);

  return (
    <BrowserRouter>
      <div>
        <header>
          <div>
            <a href="https://vite.dev" target="_blank" rel="noreferrer">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
        <aside>
          <ShoppingCart />
        </aside>
      </div>
    </BrowserRouter>
  );
}

export default App;