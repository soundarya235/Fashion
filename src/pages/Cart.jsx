import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaTrashAlt } from 'react-icons/fa';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const incomingItem = location.state?.cartItem;

  // 👑 1. LOCALSTORAGE LOGIC: கார்ட்ல ஏற்கனவே டேட்டா இருந்தா அதை முதல்ல லோடு பண்ணும் நா!
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('my_shopping_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 👑 2. புது ஐட்டம் வரும்போது பழைய ஐட்டம்களுடன் சேர்த்து LocalStorage-ல் சேமிக்கும் லாஜிக்
  useEffect(() => {
    if (incomingItem) {
      setCartItems((prevItems) => {
        // ஐடி மற்றும் சைஸ் ரெண்டும் மேட்ச் ஆகுதான்னு செக் பண்றோம் நா
        const exists = prevItems.find(
          item => item.id === incomingItem.id && item.selectedSize === incomingItem.selectedSize
        );
        
        let updatedCart;
        if (exists) {
          // ஏற்கனவே இருந்தா குவாண்டிட்டியை மட்டும் 1 கூட்டும்
          updatedCart = prevItems.map(item => 
            (item.id === incomingItem.id && item.selectedSize === incomingItem.selectedSize)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // புதுசா இருந்தா பழைய தயாரிப்புகளுடன் சேர்த்துக்கொள்ளும் (Old products won't disappear!)
          updatedCart = [...prevItems, { ...incomingItem, quantity: 1 }];
        }

        localStorage.setItem('my_shopping_cart', JSON.stringify(updatedCart));
        return updatedCart;
      });

      // ⚠️ முக்கியம் நா: ஒருமுறை கார்ட்ல ஆட் ஆனதும், யூஆர்எல் ஸ்டேட்டை கிளியர் பண்ணிடுறோம்.
      // இல்லனா பேஜ்ஜை ரீஃப்ரெஷ் பண்ணும்போது திரும்ப திரும்ப அதே ப்ராடக்ட் ஆட் ஆகிட்டே இருக்கும்!
      window.history.replaceState({}, document.title);
    }
  }, [incomingItem]);

  // 3. Quantity Increase Function (+ பட்டன்)
  const increaseQty = (id, size) => {
    setCartItems(prev => {
      const updated = prev.map(item => 
        (item.id === id && item.selectedSize === size) ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('my_shopping_cart', JSON.stringify(updated));
      return updated;
    });
  };

  // 4. Quantity Decrease Function (- பட்டன்)
  const decreaseQty = (id, size) => {
    setCartItems(prev => {
      const updated = prev.map(item => 
        (item.id === id && item.selectedSize === size) ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
      );
      localStorage.setItem('my_shopping_cart', JSON.stringify(updated));
      return updated;
    });
  };

  // 5. Size Selection Change Function (கார்ட்டுக்குள்ளேயே சைஸ் மாத்தும்போது)
  const changeSize = (id, oldSize, newSize) => {
    setCartItems(prev => {
      const itemWithNewSize = prev.find(item => item.id === id && item.selectedSize === newSize);
      let updated;
      
      if (itemWithNewSize) {
        updated = prev.map(item => 
          (item.id === id && item.selectedSize === newSize) ? { ...item, quantity: item.quantity + 1 } : item
        ).filter(item => !(item.id === id && item.selectedSize === oldSize));
      } else {
        updated = prev.map(item => 
          (item.id === id && item.selectedSize === oldSize) ? { ...item, selectedSize: newSize } : item
        );
      }
      
      localStorage.setItem('my_shopping_cart', JSON.stringify(updated));
      return updated;
    });
  };

  // 6. Item Remove Function (Delete பட்டன்)
  const removeItem = (id, size) => {
    setCartItems(prev => {
      const updated = prev.filter(item => !(item.id === id && item.selectedSize === size));
      localStorage.setItem('my_shopping_cart', JSON.stringify(updated));
      return updated;
    });
  };

  // 7. REAL-TIME PRICE & GST (TAX 8%) CALCULATIONS
  const subtotal = cartItems.reduce((acc, item) => {
    const numPrice = Number(item.price.replace(/[^0-9.-]+/g, ""));
    return acc + (numPrice * item.quantity);
  }, 0);

  const taxAmount = subtotal * 0.08; 
  const shippingCost = subtotal > 0 ? 15.00 : 0.00; 
  const finalTotal = subtotal + taxAmount + shippingCost;

  return (
    <div className="min-h-screen bg-white font-roboto w-full flex flex-col justify-between">
      <Navbar />

      <main className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-10 flex-grow">
        <h1 className="text-4xl sm:text-[42px] font-bold text-[#1A1A1A] text-center mb-16 tracking-tight">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl font-light mb-6">Your cart empty</p>
            <button 
              onClick={() => navigate('/categories')} 
              className="bg-[#FF6F61] hover:bg-[#ff5b4c] text-white px-8 py-3 rounded-xl font-medium transition-all cursor-pointer shadow-md"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT PANEL: YOUR CART ITEMS */}
            <div className="lg:col-span-7 space-y-8">
              <h2 className="text-3xl font-bold text-[#1A1A1A] tracking-tight mb-6">Your Cart</h2>

              {cartItems.map((item, index) => {
                const singlePriceNum = Number(item.price.replace(/[^0-9.-]+/g, ""));
                const itemKey = `${item.id}-${item.selectedSize}-${index}`;
                
                return (
                  <div key={itemKey} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-gray-100">
                    <div className="w-36 h-48 bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-grow flex flex-col space-y-4 w-full">
                      <div>
                        <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight">{item.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">Size:</span>
                        {['S', 'M', 'L', 'XL'].map((size) => (
                          <button
                            key={size}
                            onClick={() => changeSize(item.id, item.selectedSize, size)}
                            className={`w-8 h-8 text-xs font-medium border rounded-md transition-all text-center flex items-center justify-center cursor-pointer ${
                              item.selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 bg-white text-gray-600'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 pt-1">
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-9 bg-white">
                          <button onClick={() => decreaseQty(item.id, item.selectedSize)} className="px-3 h-full text-gray-500 cursor-pointer">-</button>
                          <span className="px-3 h-full flex items-center justify-center font-semibold text-sm border-x border-gray-200 min-w-[30px]">{item.quantity}</span>
                          <button onClick={() => increaseQty(item.id, item.selectedSize)} className="px-3 h-full text-gray-500 cursor-pointer">+</button>
                        </div>

                        <button onClick={() => removeItem(item.id, item.selectedSize)} className="text-[#FF3B30] hover:text-red-700 p-2 cursor-pointer">
                          <FaTrashAlt className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xl font-bold text-[#1A1A1A] sm:text-right min-w-[100px] pt-1">
                      ${(singlePriceNum * item.quantity).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT PANEL: PRICE BREAKDOWN */}
            <div className="lg:col-span-5 bg-white lg:pl-8 lg:border-l border-gray-100 flex flex-col w-full pt-2">
              <h2 className="text-xl font-bold text-[#1A1A1A] text-right mb-8 tracking-tight">Price Breakdown</h2>
              
              <div className="space-y-4 text-base text-gray-600 w-full">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-normal text-gray-500">Subtotal</span>
                  <span className="font-medium text-[#1A1A1A] text-lg">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-normal text-gray-500">Tax (8%)</span>
                  <span className="font-medium text-[#1A1A1A] text-lg">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-lg font-normal text-gray-500">Shipping</span>
                  <span className="font-medium text-[#1A1A1A] text-lg">${shippingCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-6 flex justify-between items-center text-xl font-bold text-[#1A1A1A]">
                <span>Total</span>
                <span className="text-2xl">${finalTotal.toFixed(2)}</span>
              </div>

              <button 
                onClick={() => navigate('/checkout', { state: { subtotal, taxAmount, shippingCost, finalTotal } })}
                className="w-full mt-10 bg-[#FF6F61] hover:bg-[#ff5b4c] text-white font-medium text-base py-3.5 rounded-xl transition-all shadow-md text-center cursor-pointer transform active:scale-95"
                >
                Proceed to Checkout
                </button>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;