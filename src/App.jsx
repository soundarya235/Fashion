import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import ProductOverview from './pages/ProductOverview';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; 
import About from './pages/About';
import Contact from './pages/Contact';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/product-overview" element={<ProductOverview />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} /> {/* 👈 செக்கவுட் ரூட் */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      
     
    </Routes>
  );
}

export default App;