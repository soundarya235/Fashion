import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Main Container */}
      <main className="max-w-[800px] mx-auto px-6 py-12">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">About Us</h1>

        {/* Hero Image - PDF-ல இருக்குற மாதிரி ஒரு சிம்பிள் இமேஜ் பாக்ஸ் */}
        <img 
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200" 
        alt="About Fashion World" 
            className="w-full h-[400px] object-cover" 
        />

        {/* Content Paragraphs */}
        <div className="text-gray-700 space-y-6 text-base leading-relaxed">
          <p>
            We are a modern fashion brand focused on creating stylish, comfortable, and high-quality clothing for everyday life. 
            Our goal is to offer designs that are both trendy and timeless, giving customers confidence in every outfit they wear.
          </p>
          
          <p>
            We believe in using good materials, sustainable practices, and thoughtful craftsmanship. 
            Every piece we create is made with attention to detail and a passion for fashion.
          </p>
          
          <p>
            Our team brings together creativity, experience, and fresh ideas to deliver the best for our customers. 
            We're committed to offering a smooth shopping experience and products that inspire your personal style.
          </p>
          
          <p className="font-semibold text-gray-900 pt-4">
            Thank you for being a part of our journey. Together, we continue to shape a better and more stylish future.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default About;