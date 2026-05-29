import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', contact: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully நா!");
    setFormData({ name: '', email: '', contact: '' });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-6 py-16 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-12">Contact Us</h1>

        {/* 👑 Contact Form Card (PDF டிசைன் படி) */}
        <div className="w-full max-w-[600px] border border-gray-200 p-8 md:p-12 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Contact Us</h2>
          <p className="text-sm text-gray-500 mb-8">Let's get in touch!</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contact</label>
              <input type="text" required value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black" />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="newsletter" className="w-4 h-4 accent-black" />
              <label htmlFor="newsletter" className="text-sm text-gray-600">I would like to receive newsletter</label>
            </div>

            <button type="submit" className="w-full bg-[#0052CC] text-white font-bold py-3 hover:bg-[#0043a4] transition-colors">
              Submit
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;