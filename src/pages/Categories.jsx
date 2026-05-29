import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // useNavigate ஆட் பண்ணியாச்சு நா
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ─── DATA IMPORT ───
import { allProductsData } from './productsData'; // Unga productsData call panrom na

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate(); // Navigation Engine Initialization
  
  // 1. Top Bar Filter State (All, Modern, Traditional, Casual, Formals)
  const activeStyle = searchParams.get('type') || 'all';

  // 2. Left Sidebar Gender State (All, Men, Women, Kids)
  const [activeGender, setActiveGender] = useState('all');

  // 3. Products List State
  const [filteredProducts, setFilteredProducts] = useState(allProductsData);

  // Top Nav Tab அல்லது Left Sidebar மாறும்போது இந்த Filter லாஜிக் இயங்கும்
  useEffect(() => {
    let updatedList = allProductsData;

    // Top Style Filter Logic (e.g., modern, traditional)
    if (activeStyle !== 'all') {
      updatedList = updatedList.filter(item => item.style === activeStyle);
    }

    // Left Sidebar Gender Filter Logic (e.g., men, women)
    if (activeGender !== 'all') {
      updatedList = updatedList.filter(item => item.gender === activeGender);
    }

    setFilteredProducts(updatedList);
  }, [activeStyle, activeGender]);

  // Top Nav Tabs கிளிக் பண்ணும்போது URL Parameters-ஐ மாத்துற ஃபங்க்ஷன்
  const handleStyleTabClick = (styleName) => {
    if (styleName === 'all') {
      searchParams.delete('type'); // 'All' கிளிக் பண்ணா URL-ஐ கிளீன் பண்ணிடும்
    } else {
      searchParams.set('type', styleName);
    }
    setSearchParams(searchParams);
  };

  // Figma-வில் உள்ள அதே ஆர்டர் மற்றும் பெயர்கள்
  const topTabs = [
    { id: 'all', label: 'All' },
    { id: 'modern', label: 'Modern' },
    { id: 'traditional', label: 'Traditional' },
    { id: 'casual', label: 'Casual' },
    { id: 'formals', label: 'Formals' }
  ];

  const sidebarGenders = ['all', 'men', 'women', 'kids'];

  return (
    <div className="min-h-screen bg-white font-roboto w-full overflow-x-hidden">
      {/* Responsive Navbar Component */}
      <Navbar />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-10">
        
        {/* ─── 1. TOP CATEGORIES NAVIGATION BARS (Figma Exactly) ─── */}
        <div className="flex items-center text-xl sm:text-2xl font-normal text-[#1A1A1A] pb-6 border-b border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-none gap-x-1 sm:gap-x-2">
          {topTabs.map((tab, i) => (
            <div key={tab.id} className="flex items-center">
              <button
                onClick={() => handleStyleTabClick(tab.id)}
                className={`cursor-pointer px-2 transition-all duration-200 ${
                  activeStyle === tab.id 
                    ? 'text-[#FF6F61] font-medium scale-102' // Active ஆனா உங்க Figma-ல இருக்குற சாய்ந்த லைட் கோரல் கலர்
                    : 'text-[#1A1A1A] hover:text-[#FF6F61]'
                }`}
              >
                {tab.label}
              </button>
              {/* Tabs-க்கு நடுவுல வர்ற சாய்வுக்கோடு '/' */}
              {i < topTabs.length - 1 && <span className="text-gray-300 font-light text-2xl select-none mx-1">/</span>}
            </div>
          ))}
        </div>

        {/* Main Double Column Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pt-10 items-start">
          
          {/* ─── 2. LEFT SIDEBAR FILTER PANEL ─── */}
          <div className="md:col-span-3 lg:col-span-2.5 space-y-12">
            
            {/* Categories Segment Box */}
            <div className="w-full flex flex-col items-center">
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-6 tracking-tight lowercase">
                categories
              </h3>
              <div className="flex flex-col space-y-4 w-full max-w-[180px]">
                {sidebarGenders.map((gen) => (
                  <button
                    key={gen}
                    onClick={() => setActiveGender(gen)}
                    className={`text-lg capitalize transition-all py-2 rounded-none tracking-wide text-center cursor-pointer ${
                      activeGender === gen
                        ? 'bg-[#C4C4C4]/50 font-medium text-[#1A1A1A]' // Selected Grey Strip Background
                        : 'text-gray-600 hover:text-black font-normal'
                    }`}
                  >
                    {gen === 'all' ? 'All' : gen === 'men' ? 'Men' : gen === 'women' ? 'Women' : 'Kids'}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Segment Box */}
            <div className="w-full flex flex-col items-center pt-4">
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-5 tracking-tight lowercase">
                Size
              </h3>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-5 w-full max-w-[190px] mx-auto px-1">
                {['S', 'L', 'M', 'XL', 'XXL', 'XXXL'].map((size) => (
                  <button key={size} className="border border-gray-200 text-base font-normal w-full h-11 rounded-xl hover:border-black transition-colors bg-white cursor-pointer text-center flex items-center justify-center">
                    {size}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ─── 3. RIGHT SIDEBAR PRODUCTS LIST GRID (Screenshot (1021).jpg Perfect Match) ─── */}
          <div className="md:col-span-9 lg:col-span-9.5">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 text-gray-400 text-lg font-light">
                No items available in this match right now.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white overflow-hidden group flex flex-col">
                    
                    {/* PRODUCT IMAGE CONTAINER BOX WITH FIGMA HOVER OVERLAY */}
                    <div className="w-full aspect-[3/4] border border-gray-100 overflow-hidden bg-gray-50 relative shadow-sm rounded-none">
                      
                      {/* Base Product Image */}
                      <img 
                        src={product.img} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500" 
                      />

                      {/* HOVER INTERACTION LAYER (Screenshot (1021).jpg Model) */}
                      {/* Image-க்கு மேல மவுஸ் போகும்போது மட்டும் `opacity-100` ஆகி உள்ளே இருக்குற எலிமெண்ட்ஸ் தெரியும் */}
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                        
                        {/* 1. TOP-RIGHT RED HEART ICON */}
                        <div className="flex justify-end w-full">
                          <button className="text-[#FF3B30] hover:scale-110 transition-transform cursor-pointer drop-shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                          </button>
                        </div>

                        {/* 2. BOTTOM CENTERED BUY NOW BUTTON */}
                        <div className="w-full px-2 pb-2">
                          <button 
                            
                            onClick={() => navigate('/product-overview', { state: { product } })}
                            className="w-full bg-[#FF6F61] hover:bg-[#ff5b4c] text-white font-medium text-base py-3 rounded-xl transition-all shadow-md transform active:scale-95 cursor-pointer text-center"
                          >
                            Buy Now
                          </button>
                        </div>

                      </div>
                    </div>
                    
                    {/* Product Details Area (Figma Model Title and Price on same row) */}
                    <div className="mt-4 flex justify-between items-start w-full px-1">
                      <div>
                        <h4 className="font-bold text-base text-[#1A1A1A] tracking-tight">
                          {product.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-400 font-normal mt-0.5">
                          {product.desc}
                        </p>
                      </div>
                      <span className="font-bold text-base text-[#1A1A1A]">
                        {product.price}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Categories;