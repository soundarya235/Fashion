import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import WelcomeModal from './WelcomeModal'; 
import LoginFormModal from './LoginFormModal'; // இதையும் இம்போர்ட் செய்யுங்க
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false); // வெல்கம் மாடல்
  const [showLogin, setShowLogin] = useState(false);     // லாகின் மாடல்

  return (
    <nav className="w-full bg-[#F3F3F3] border-b border-gray-100 font-roboto relative z-50">
      <div className="w-full py-5 px-6 lg:px-16 flex items-center justify-between">
        
        <div className="text-3xl font-bold tracking-wide font-cursive text-[#1A1A1A]">
          <Link to="/" onClick={() => setIsOpen(false)}>Fashion World</Link>
        </div>

        <div className="hidden lg:flex items-center space-x-10 text-xl font-semibold text-[#1A1A1A] capitalize">
  
  <NavLink to="/" className={({ isActive }) => isActive ? "text-[#FF6F61] border-b-2 border-[#FF6F61]" : "hover:text-[#FF6F61]"}>
    Home
  </NavLink>

  <NavLink to="/categories" className={({ isActive }) => isActive ? "text-[#FF6F61] border-b-2 border-[#FF6F61]" : "hover:text-[#FF6F61]"}>
    Categories
  </NavLink>

  <NavLink to="/about" className={({ isActive }) => isActive ? "text-[#FF6F61] border-b-2 border-[#FF6F61]" : "hover:text-[#FF6F61]"}>
    About Us
  </NavLink>

  <NavLink to="/contact" className={({ isActive }) => isActive ? "text-[#FF6F61] border-b-2 border-[#FF6F61]" : "hover:text-[#FF6F61]"}>
    Contact
  </NavLink>

</div>

        <div className="flex items-center space-x-10">
          <Link to="/cart" className="text-gray-700 hover:text-[#FF6F61] transition-colors cursor-pointer" aria-label="Cart">
  <FaShoppingCart size={18} />
</Link>
          
          {/* மன் ஐகான் - வெல்கம் மாடல் */}
          <button onClick={() => setShowWelcome(true)} className="text-gray-700 hover:text-[#FF6F61] cursor-pointer">
            <FaUser size={18} />
          </button>
          
          {/* Login பட்டன் - லாகின் மாடல் */}
          <button 
            onClick={() => setShowLogin(true)} 
            className="hidden lg:inline-block text-white px-7 py-2.5 rounded-xl font-medium bg-[#2D2D2D] hover:bg-black transition-colors"
          >
            Login
          </button>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-gray-700"><FaBars size={22} /></button>
        </div>
      </div>

      {/* பாப்-அப்ஸ் */}
      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
      {showLogin && <LoginFormModal onClose={() => setShowLogin(false)} />}
    </nav>
  );
};

export default Navbar;