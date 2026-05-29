import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductOverview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  // Default Size 'M' செலக்ட் பண்ணி வச்சிருக்கோம் நா
  const [selectedSize, setSelectedSize] = useState('M');

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <Navbar /><div className="text-center py-20 text-gray-500">Product details missing நா!</div><Footer />
      </div>
    );
  }

  // Add to Cart கிளிக் பண்ணும்போது சைஸ் டேட்டாவையும் சேர்த்து கார்ட்டுக்கு அனுப்புறோம் நா
  const handleAddToCart = () => {
    const productWithDetails = { ...product, selectedSize };
    navigate('/cart', { state: { cartItem: productWithDetails } });
  };

  return (
    <div className="min-h-screen bg-white font-roboto flex flex-col justify-between">
      <Navbar />
      <main className="w-full max-w-[1200px] mx-auto px-6 py-16 flex-grow grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Product Image */}
        <div className="w-full max-w-[450px] mx-auto aspect-[3/4] overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Product Info & Actions */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">{product.name}</h1>
            <p className="text-gray-500 mt-2 text-base leading-relaxed">{product.desc || "Premium quality fashion wear curated for the modern wardrobe. Elevate your personal style daily."}</p>
          </div>

          <div className="text-2xl font-black text-[#1A1A1A]">{product.price}</div>

          {/* Size Chooser Panel */}
          <div className="space-y-3">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Select Size</span>
            <div className="flex gap-3">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-11 h-11 font-medium text-sm border rounded-xl transition-all cursor-pointer ${
                    selectedSize === size ? 'bg-black border-black text-white shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Add To Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full max-w-[350px] bg-[#FF6F61] hover:bg-[#ff5b4c] text-white font-medium py-4 rounded-xl transition-all shadow-md transform active:scale-95 cursor-pointer block text-center text-base"
          >
            Add to Cart
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductOverview;