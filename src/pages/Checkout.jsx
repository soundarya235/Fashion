import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Cart பேஜ்ல இருந்து வர்ற கணக்குகள் நா
  const { subtotal = 0, taxAmount = 0, shippingCost = 0, finalTotal = 0 } = location.state || {};

  // LocalStorage-ல் இருந்து தயாரிப்புகள்
  const [cartItems] = useState(() => {
    const savedCart = localStorage.getItem('my_shopping_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // REAL-TIME STATE FOR INPUT FIELDS
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    stateProvince: '',
    zipCode: '',
    country: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState({ code: '', discount: 0 });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'WELCOME10') {
      const discountAmount = subtotal * 0.10;
      setAppliedPromo({ code: 'WELCOME10', discount: discountAmount });
      alert("🎉 Promo Code Applied! 10% Discount Added ");
    } else {
      alert("❌ Invalid Promo Code! Try 'WELCOME10'");
    }
  };

  // 👑 பட்டனை கிளிக் பண்ணும்போது ஃபார்மை வேலிடேட் பண்ணும் ஃபங்க்ஷன் நா
  const handleFinalCheckout = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First Name is required!';
    if (!formData.email) errors.email = 'Email is required!';
    if (!formData.phone) errors.phone = 'Phone Number is required!';
    if (!formData.streetAddress) errors.streetAddress = 'Address is required!';
    if (!formData.city) errors.city = 'City is required!';
    if (!formData.zipCode) errors.zipCode = 'ZIP Code is required!';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      alert("⚠️ Please fill in the missing details in the form!");
      return;
    }

    alert(`🎉 Order Confirmed!\n\nHi ${formData.firstName}, unga order successfully placed using ${paymentMethod} நா!`);
    localStorage.removeItem('my_shopping_cart');
    navigate('/categories');
  };

  const updatedFinalTotal = finalTotal - appliedPromo.discount;

  return (
    <div className="min-h-screen bg-white font-sans w-full flex flex-col justify-between">
      <Navbar />

      <main className="w-full max-w-[1300px] mx-auto px-6 md:px-12 py-10 flex-grow">
        
        {/* PROGRESS BAR STEPS */}
        <div className="flex items-center justify-center gap-4 text-sm font-semibold text-gray-400 mb-12 select-none">
          <div className="flex items-center gap-2 text-black">
            <span className="w-5 h-5 rounded-full bg-[#FF6F61] text-white flex items-center justify-center text-xs">1</span>
            <span className="text-gray-900 font-bold">Shipping</span>
          </div>
          <div className="w-12 h-[1px] bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-xs">2</span>
            <span>Payment</span>
          </div>
          <div className="w-12 h-[1px] bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-xs">3</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* MAIN 12-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* 👈 LEFT PANEL: DELIVERY & PAYMENT FORM */}
          <div className="lg:col-span-7 space-y-8">
            
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-5 tracking-tight">Delivery Information</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">First Name *</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full border ${formErrors.firstName ? 'border-red-500' : 'border-gray-200'} px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none`} 
                    />
                    {formErrors.firstName && <span className="text-xs text-red-500 mt-0.5 block">{formErrors.firstName}</span>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-200'} px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none`} 
                  />
                  {formErrors.email && <span className="text-xs text-red-500 mt-0.5 block">{formErrors.email}</span>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full border ${formErrors.phone ? 'border-red-500' : 'border-gray-200'} px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none`} 
                  />
                  {formErrors.phone && <span className="text-xs text-red-500 mt-0.5 block">{formErrors.phone}</span>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Street Address *</label>
                  <input 
                    type="text" 
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className={`w-full border ${formErrors.streetAddress ? 'border-red-500' : 'border-gray-200'} px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none`} 
                  />
                  {formErrors.streetAddress && <span className="text-xs text-red-500 mt-0.5 block">{formErrors.streetAddress}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">City *</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full border ${formErrors.city ? 'border-red-500' : 'border-gray-200'} px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none`} 
                    />
                    {formErrors.city && <span className="text-xs text-red-500 mt-0.5 block">{formErrors.city}</span>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">State / Province</label>
                    <input 
                      type="text" 
                      name="stateProvince"
                      value={formData.stateProvince}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">ZIP / Postal Code *</label>
                    <input 
                      type="text" 
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full border ${formErrors.zipCode ? 'border-red-500' : 'border-gray-200'} px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none`} 
                    />
                    {formErrors.zipCode && <span className="text-xs text-red-500 mt-0.5 block">{formErrors.zipCode}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Country</label>
                  <input 
                    type="text" 
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none" 
                  />
                </div>
              </div>
            </div>

            {/* Payment Options Section */}
            <div className="pt-2">
              <h3 className="text-base font-bold text-gray-900 mb-3 tracking-tight">Payment Options</h3>
              <div className="space-y-2.5">
                {['Card', 'UPI', 'Netbanking'].map((method) => (
                  <label key={method} className="flex items-center gap-3 cursor-pointer select-none w-max">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-[#FF6F61] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Promo Code Section */}
            <div className="pt-2">
              <h3 className="text-base font-bold text-gray-900 mb-3 tracking-tight">Promo Code</h3>
              <div className="flex max-w-[320px] border border-gray-200 overflow-hidden">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Try: WELCOME10" 
                  className="w-full px-3 py-2 text-sm focus:outline-none uppercase"
                />
                <button 
                  onClick={handleApplyPromo}
                  className="bg-[#FF6F61] hover:bg-[#ff5b4c] text-white px-5 text-sm font-medium transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* 👑 👑 👑 👑 FIXED BUTTON: ஃபார்முக்கு வெளிய, ப்ரோமோ கோடுக்கு கீழ ஓப்பனா கொண்டு வந்தாச்சு நா! இப்போ கண்டிப்பா தெரியும்! */}
            <div className="pt-6">
  <button 
    type="button"
    onClick={handleFinalCheckout}
    className="bg-[#0052CC] hover:bg-[#0043a4] text-Black font-bold text-sm px-10 py-3.5 transition-all rounded-md cursor-pointer block text-center shadow-md hover:shadow-lg active:scale-95"
  >
    Continue to Payment
  </button>
</div>

          </div>

          {/* 👉 RIGHT PANEL: ORDER SUMMARY CARD */}
          <div className="lg:col-span-5 bg-white border border-gray-200 p-6 space-y-6 lg:mt-7">
            <h2 className="text-base font-bold text-gray-900 tracking-tight">Order Summary</h2>
            
            {/* ஐட்டம் லிஸ்ட் */}
            <div className="space-y-4 max-h-[250px] overflow-y-auto pr-1">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100 last:border-none last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-16 bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Quantity: {item.quantity}</p>
                      <p className="text-[11px] text-gray-400">Size: {item.selectedSize}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-800">
                    ${(Number(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* பில்லிங் விபரம் */}
            <div className="space-y-3 pt-4 border-t border-gray-200 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              
              {appliedPromo.discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Promo Discount (10%)</span>
                  <span>-${appliedPromo.discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span>Shipping</span>
                <span className="font-bold text-gray-800">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 pt-1">
                <span>Total</span>
                <span className="text-xl text-gray-900">${updatedFinalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;