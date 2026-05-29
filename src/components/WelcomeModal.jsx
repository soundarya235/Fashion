import React from 'react';

const WelcomeModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 w-full max-w-sm relative shadow-2xl rounded-sm">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-4 text-2xl text-gray-500">×</button>
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Welcome to</h2>
          <p className="font-bold text-lg text-gray-900">Luxury Fashion World</p>
        </div>
        
        {/* Input Label */}
        <p className="text-sm text-gray-600 mb-2">Please Enter Your Mobile Number</p>
        
        {/* Phone Input Box */}
        <div className="flex border border-gray-300 rounded-sm mb-2 p-3 bg-gray-50">
          <span className="text-gray-500 border-r border-gray-300 pr-2 mr-2">📞 +91</span>
          <input 
            type="tel" 
            placeholder="Mobile number" 
            className="bg-transparent focus:outline-none w-full"
          />
        </div>
        
        {/* Email Switch & Policy */}
        <div className="text-right mb-4">
          <button className="text-sm font-semibold hover:underline">Use E-Mail</button>
        </div>
        
        <p className="text-[10px] text-gray-500 leading-tight mb-6">
          This site is protected by reCAPTCHA and the Google <span className="underline cursor-pointer">Privacy Policy</span> and <span className="underline cursor-pointer">Terms of Service</span> apply. 
          On Clicking Continue, I agree to <span className="underline cursor-pointer">Terms of Service</span> & <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
        
        {/* Continue Button */}
        <button className="w-full bg-[#FF6F61] text-white py-3 font-semibold hover:bg-[#ff5b4c] transition-all rounded-sm">
          Continue
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;