import React, { useState } from 'react'; // 1. useState structural logic state add panniyachu na!
import { Link, useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Hero Banner Models
import model1 from '../assets/images/Frame 2656.jpg';
import model2 from '../assets/images/Frame 2657.jpg';
import model3 from '../assets/images/Frame 2658.jpg';
import model4 from '../assets/images/Frame 2659.jpg';

// Shop By Category Frames
import modernCardImg from '../assets/images/Default.jpg'; 
import casualCardImg from '../assets/images/Container+Shadow+BackgroundColor.jpg'; 
import traditionalCardImg from '../assets/images/Container+Shadow+BackgroundColor (2).jpg'; 
import formalCardImg from '../assets/images/Container+Shadow+BackgroundColor (1).jpg'; 

// Promo & Bottom Featured Products Images
import promoBannerImg from '../assets/images/Rectangle 178.jpg'; 
import featProduct1 from '../assets/images/Frame 2806.jpg'; 
import featProduct2 from '../assets/images/Frame 2664.jpg'; 
import featProduct3 from '../assets/images/Frame 2665.jpg'; 
import featProduct4 from '../assets/images/Frame 2807.jpg';

const Home = () => {
  const navigate = useNavigate();
  
  // 2. Newsletter input variables control state logic
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Real-time link redirect filter engine function
  const handleCategoryClick = (styleType) => {
    const formattedType = styleType === 'Morden' ? 'modern' : styleType.toLowerCase();
    navigate(`/categories?type=${formattedType}`);
  };

  // Newsletter Submit Trigger Event Handler
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      alert(`Awesome! ${newsletterEmail} has been subscribed to our newsletter.`);
      setNewsletterEmail('');
    }
  };

  // Figma standard accurate cards layout configuration array
  const categoriesList = [
    { name: 'Morden', img: modernCardImg },
    { name: 'Casual', img: casualCardImg },
    { name: 'Traditional', img: traditionalCardImg },
    { name: 'Formals', img: formalCardImg }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      
      {/* NAVBAR COMPONENT */}
      <Navbar />

      {/* HERO BANNER SECTION */}
      <main className="px-6 md:px-12 lg:px-20 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* LEFT SECTION */}
        <div className="lg:col-span-5 text-center lg:text-left">
          <h1 className="text-[40px] sm:text-[52px] lg:text-[72px] font-bold text-[#7A7A7A] leading-tight mb-6">
            Elevate Your Style This Season
          </h1>

          <p className="text-[#8F8F8F] text-base md:text-lg lg:text-xl leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
            Discover our new collection of premium fashion pieces designed for the modern connoisseur.
          </p>

          <Link to="/shop" className="inline-block bg-[#FF6F61] text-white px-7 py-4 rounded-xl text-lg">
            Go To Shop
          </Link>
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:col-span-7">
          
          {/* MOBILE + TABLET HERO */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 lg:hidden">
            <img src={model1} alt="" className="w-full h-[260px] object-cover" />
            <img src={model2} alt="" className="w-full h-[320px] object-cover" />
            <img src={model3} alt="" className="w-full h-[260px] object-cover" />
            <img src={model4} alt="" className="w-full h-[320px] object-cover" />
          </div>

          {/* DESKTOP HERO */}
          <div className="hidden lg:flex gap-5 justify-end h-[560px]">
            <div className="h-[88%] mt-auto">
              <img src={model1} alt="" className="w-[170px] h-full object-cover" />
            </div>
            <div className="h-full -mt-8">
              <img src={model2} alt="" className="w-[170px] h-full object-cover" />
            </div>
            <div className="h-[82%] mt-auto">
              <img src={model3} alt="" className="w-[170px] h-full object-cover" />
            </div>
            <div className="h-[92%] my-auto">
              <img src={model4} alt="" className="w-[170px] h-full object-cover" />
            </div>
          </div>

        </div>
      </main>

      {/* SHOP BY CATEGORY SECTION */}
      <section className="w-full bg-white px-6 md:px-12 lg:px-20 py-14 border-t border-gray-50">
        
        {/* Title Group */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[40px] font-bold text-[#1A1A1A] tracking-tight">
            Shop By Category
          </h2>
          <p className="text-[#767676] text-sm md:text-base font-light mt-2">
            Curated collections for every occasion
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 w-full max-w-[1440px] mx-auto">
          {categoriesList.map((cat, index) => (
            <div 
              key={index}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative aspect-[3/4] bg-gray-50 overflow-hidden cursor-pointer shadow-sm transition-all duration-300 hover:shadow-md border border-gray-100 rounded-none"
            >
              {/* Product Cover Image */}
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />

              {/* TRANSLUCENT BLUR BAR (நடுவுல வர்ற மங்கலான பட்டை - Screenshot 1016 Model) */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-sm py-3 text-center border-y border-white/10 transition-all duration-200 group-hover:bg-white/80">
                <span className="text-sm sm:text-base md:text-lg font-medium text-[#1A1A1A] tracking-wide block">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 50% OFF BANNER SECTION */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-6">
        <div className="w-full h-[280px] md:h-[350px] relative rounded-none overflow-hidden shadow-sm border border-gray-100">
          <img 
            src={promoBannerImg} 
            alt="Promo Sale Banner" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/40 flex items-center justify-center">
            <h2 className="text-5xl md:text-[76px] font-black text-[#2B0E0E] tracking-tight uppercase select-none">
              50% OFF
            </h2>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-10 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          
          {[
            { id: 101, name: 'T-Shirt', desc: 'Cotton Cloths for Summer', price: '$250', rating: '4★', img: featProduct1 },
            { id: 102, name: 'scout', desc: 'Cotton Cloths for Summer', price: '$250', rating: '4★', img: featProduct2 },
            { id: 103, name: 'Gown', desc: 'Cotton Cloths for Summer', price: '$250', rating: '4★', img: featProduct3 },
            { id: 104, name: 'Top', desc: 'Cotton Cloths for Summer', price: '$250', rating: '4★', img: featProduct4 },
          ].map((product) => (
            <div 
              key={product.id} 
              className="relative aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden shadow-sm group border border-gray-100"
            >
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.015]" 
              />

              {/* Translucent Bottom Info Plate Block */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12 pb-5 px-5 flex flex-col justify-end text-white">
                <h4 className="font-bold text-lg tracking-wide">{product.name}</h4>
                <p className="text-xs text-gray-300 font-light mt-0.5">{product.desc}</p>
                
                <span className="absolute right-5 bottom-16 font-bold text-lg text-white tracking-wide">
                  {product.price}
                </span>

                <div className="flex justify-between items-center mt-4 w-full">
                  <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-sm font-bold text-[#FFA8A1]">{product.rating.replace('★', '')}</span>
                    <span className="text-xs text-[#FFA8A1]">★</span>
                  </div>

                  <button 
                    onClick={() => navigate('/cart', { state: { product } })}
                    className="bg-[#FF6F61] hover:bg-[#ff5b4c] text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md transform active:scale-95 cursor-pointer"
                  >
                    Buy Now
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ─── FIGMA SPECIFIC: NEWSLETTER SECTION INSIDE HOME.JSX ─── */}
      {/* Screenshot (1018).jpg model perfect clean layout setup */}
      <section className="w-full bg-white px-6 md:px-12 lg:px-20 py-16 text-center border-t border-gray-100">
        <div className="max-w-4xl mx-auto space-y-3">
          <h2 className="text-3xl md:text-[40px] font-bold text-[#1A1A1A] tracking-tight">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-[#767676] text-sm md:text-base font-light">
            Be the first to know about new collections and exclusive offers
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex items-center justify-center pt-6 max-w-[550px] mx-auto w-full">
            <input 
              type="email" 
              placeholder="Your email address"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full h-12 border border-gray-300 px-4 text-base focus:outline-none focus:border-black rounded-none" 
            />
            <button 
              type="submit"
              className="bg-[#FF6F61] hover:bg-[#ff5b4c] text-white font-medium text-base h-12 px-8 transition-colors rounded-none whitespace-nowrap cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* SEPARATE STANDALONE DARK FOOTER BLOCK CALL */}
      <Footer />

    </div>
  );
};

export default Home;