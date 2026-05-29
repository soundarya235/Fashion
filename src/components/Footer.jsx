import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Social Icons

const Footer = () => {
  return (
    <footer className="w-full bg-[#222222] text-[#A3A3A3] px-6 md:px-12 lg:px-20 py-16 border-t border-zinc-800 font-roboto">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-start">
        
        {/* Brand & Intro Block (4 Columns) */}
        <div className="md:col-span-4 space-y-5">
          <h3 className="text-xl font-bold text-white tracking-widest uppercase">
            LUXE.
          </h3>
          <p className="text-sm font-normal text-gray-400 max-w-[280px] leading-relaxed">
            Premium fashion for the modern connoisseur. Elevate your style with our curated collections.
          </p>
          
          {/* Social Icons Stack (Exactly from Figma Screenshot 1018) */}
          <div className="flex items-center space-x-3 pt-2">
            {[
              { icon: <FaFacebookF size={14} />, link: '#' },
              { icon: <FaInstagram size={14} />, link: '#' },
              { icon: <FaTwitter size={14} />, link: '#' },
              { icon: <FaLinkedinIn size={14} />, link: '#' },
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.link}
                className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-800/40 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Segments (8 Columns Total) */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-4">
          
          {/* Shop Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide">Shop</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Women</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Men</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Help Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide">Help</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Customer Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">My Account</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Find a Store</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* About Navigation Links */}
          <div className="space-y-4 col-span-2 sm:col-span-1">
            <h4 className="text-white font-bold text-base tracking-wide">About</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Corporate Responsibility</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;