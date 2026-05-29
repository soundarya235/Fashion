import React from 'react';

const LoginFormModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white p-8 w-full max-w-sm relative shadow-2xl">
        <button onClick={onClose} className="absolute top-2 right-4 text-2xl">×</button>
        <h2 className="text-2xl font-bold mb-6 text-center">LOGIN</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Username" className="w-full border-b py-2" />
          <input type="password" placeholder="Password" className="w-full border-b py-2" />
          <button className="w-full bg-[#FF6F61] text-white py-3 mt-4 font-bold">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginFormModal;