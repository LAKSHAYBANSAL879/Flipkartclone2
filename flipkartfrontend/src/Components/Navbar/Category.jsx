import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import grocery from '../../Assets/grocerybg.png';
import mobiles from '../../Assets/mobiles.png';
import fashion from '../../Assets/fashionbg.png';
import electronics from '../../Assets/electronicsbg.png'
import furniture from '../../Assets/furniture.jpeg'
import appliance from '../../Assets/appliancesbg.png'
import travel from '../../Assets/travelbg.png'
import beauty from '../../Assets/beautybg.png';
 import bike from '../../Assets/bikebg.png';
const Category = () => {
  const [showGroceryDropdown, setShowGroceryDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [showFashionDropdown, setShowFashionDropdown] = useState(false);
  const [showElectronicsDropdown, setShowElectronicsDropdown] = useState(false);
  const [showFurnitureDropdown, setShowFurnitureDropdown] = useState(false);
  const [showAppliancesDropdown, setShowAppliancesDropdown] = useState(false);
  const [showTravelDropdown, setShowTravelDropdown] = useState(false);
  const [showBeautyDropdown, setShowBeautyDropdown] = useState(false);
const [showBikeDropdown,setShowBikeDropdown]=useState(false);


  const handleGroceryHover = () => {
    setShowGroceryDropdown(true);
    setShowMobileDropdown(false); 
    setShowFashionDropdown(false);
    setShowElectronicsDropdown(false);
    setShowFurnitureDropdown(false);
setShowAppliancesDropdown(false);
setShowTravelDropdown(false);
setShowBeautyDropdown(false);
setShowBikeDropdown(false);
  };

  const handleMobileHover = () => {
    setShowMobileDropdown(true);
    setShowGroceryDropdown(false); 
    setShowFashionDropdown(false);
    setShowFurnitureDropdown(false);
setShowAppliancesDropdown(false);
setShowTravelDropdown(false);
setShowBeautyDropdown(false);
setShowBikeDropdown(false);
   

  };
  const handleFashionHover = () => {
    setShowFashionDropdown(true);
    setShowMobileDropdown(false);
    setShowGroceryDropdown(false); 
    setShowElectronicsDropdown(false);
    setShowFurnitureDropdown(false);
    setShowAppliancesDropdown(false);
    setShowBeautyDropdown(false);

    setShowTravelDropdown(false);
    setShowBikeDropdown(false);

  };
  const handleElectronicsHover = () => {
    setShowFashionDropdown(false);
    setShowMobileDropdown(false);
    setShowGroceryDropdown(false); 
    setShowElectronicsDropdown(true);
    setShowFurnitureDropdown(false);
    setShowAppliancesDropdown(false);
    setShowTravelDropdown(false);
    setShowBeautyDropdown(false);
    setShowBikeDropdown(false);

  };
  const handleFurnitureHover = () => {
    setShowFashionDropdown(false);
    setShowMobileDropdown(false);
    setShowGroceryDropdown(false); 
    setShowElectronicsDropdown(false);
    setShowFurnitureDropdown(true);
    setShowAppliancesDropdown(false);
    setShowTravelDropdown(false);
    setShowBeautyDropdown(false);
    setShowBikeDropdown(false);

  };

  const handleAppliancesHover = () => {
    setShowFashionDropdown(false);
    setShowMobileDropdown(false);
    setShowGroceryDropdown(false); 
    setShowElectronicsDropdown(false);
    setShowFurnitureDropdown(false);
    setShowAppliancesDropdown(true);
    setShowTravelDropdown(false);
    setShowBeautyDropdown(false);
    setShowBikeDropdown(false);

  };
  const handleTravelHover = () => {
    setShowFashionDropdown(false);
    setShowMobileDropdown(false);
    setShowGroceryDropdown(false); 
    setShowElectronicsDropdown(false);
    setShowFurnitureDropdown(false);
    setShowAppliancesDropdown(false);
    setShowTravelDropdown(true);
    setShowBeautyDropdown(false);
    setShowBikeDropdown(false);

  };
  const handleBeautyHover = () => {
    setShowFashionDropdown(false);
    setShowMobileDropdown(false);
    setShowGroceryDropdown(false); 
    setShowElectronicsDropdown(false);
    setShowFurnitureDropdown(false);
    setShowAppliancesDropdown(false);
    setShowTravelDropdown(false);
    setShowBeautyDropdown(true);
    setShowBikeDropdown(false);

  };
  const handleBikeHover = () => {
    setShowFashionDropdown(false);
    setShowMobileDropdown(false);
    setShowGroceryDropdown(false); 
    setShowElectronicsDropdown(false);
    setShowFurnitureDropdown(false);
    setShowAppliancesDropdown(false);
    setShowTravelDropdown(false);
    setShowBeautyDropdown(false);
    setShowBikeDropdown(true);

  };
  const handleLeave = () => {
    setShowGroceryDropdown(false);
    setShowMobileDropdown(false);
    setShowFashionDropdown(false);
    setShowFurnitureDropdown(false);
    setShowAppliancesDropdown(false);
    setShowElectronicsDropdown(false);
    setShowTravelDropdown(false);
    setShowBeautyDropdown(false);
    setShowBikeDropdown(false);

  };

  return (
    <div className='mt-4 bg-white p-2 h-fit w-full '>
      <div className='flex flex-row  justify-between md:justify-evenly '>
        <Link
          to='/Grocery' 
          className='relative'
          onMouseEnter={handleGroceryHover}
          onMouseLeave={handleLeave}
        >
          <img
            src={grocery}
            alt="Category-grocery"
            className='w-10 h-10 md:w-14 md:h-14 object-cover'
          />
          <h1 className='md:font-semibold hidden md:flex font-light  text-xs md:text-base'>Grocery</h1>
          {showGroceryDropdown && (
            <div className='absolute bg-white border font-light text-sm flex flex-col  top-22 -left-4 w-36 border-gray-300 rounded p-2 hover:text-black transition-all z-30 duration-300 shadow-md'>
              <Link to='/Grocery/Pulses' className='p-2 hover:bg-gray-100 w-full'>
               Pulses
              </Link>
              <Link to='/Grocery/OilGhee' className='p-2 hover:bg-gray-100 w-full'>
                Oil,Ghee
              </Link>
            </div>
          )}
        </Link>
        <Link
          to='/Mobiles'
          className='relative'
           onMouseEnter={handleMobileHover} 
           onMouseLeave={handleLeave}
           >
               <img
            src={mobiles}
            alt="Category-mobile"
            className='w-10 h-10 md:w-14 md:h-14 object-cover'
          />
          <h1 className='md:font-semibold hidden md:flex font-light  text-xs md:text-base '>Mobiles</h1>
          {showMobileDropdown && (
            <div className='absolute bg-white border font-light text-sm flex flex-col  top-22 -left-2 w-36 border-gray-300 rounded p-2 hover:text-black transition-all z-30 duration-300 shadow-md'>
              <Link to='/Mobiles/Mobile' className='p-2 hover:bg-gray-100 w-full'>
                Latest Mobiles
              </Link>
              <Link to='/Mobiles/MobileCover' className='p-2 hover:bg-gray-100 w-full'>
                Mobile Covers
              </Link>
            </div>
          )}
        </Link>
        <Link
          to='/Fashion'
          className='relative'
          onMouseEnter={handleFashionHover}
          onMouseLeave={handleLeave}
        >
          <img
            src={fashion}
            alt="Category-fashion"
            className='w-10 h-10 md:w-14 md:h-14 object-cover'
          />
          <h1 className='md:font-semibold hidden md:flex font-light  text-xs md:text-base '>Fashion</h1>

          {showFashionDropdown && (
            <div className='absolute bg-white border font-light text-sm flex flex-col  top-22 -left-2 w-36 border-gray-300 rounded p-2 hover:text-black transition-all z-30 duration-300 shadow-md'>
              <Link to='/Fashion/Clothing' className='p-2 hover:bg-gray-100 w-full'>
               Clothing
              </Link>
              <Link to='/Footwear' className='p-2 hover:bg-gray-100 w-full'>
               Footwears
              </Link>
            </div>
          )}
        </Link>
        <Link
          to='/Electronics'
          className='relative'
          onMouseEnter={handleElectronicsHover}
          onMouseLeave={handleLeave}
        >
          <img
            src={electronics}
            alt="Category-electronics"
            className=' w-10 h-10 md:w-14 md:h-14 object-cover'
          />
          <h1 className='md:font-semibold hidden md:flex font-light  text-xs md:text-base '>Electronics</h1>

          {showElectronicsDropdown && (
            <div className='absolute bg-white border font-light text-sm flex flex-col  top-22 -left-2 w-36 border-gray-300 rounded p-2 hover:text-black transition-all z-30 duration-300 shadow-md'>
              <Link to='/Electronics/Printer' className='p-2 hover:bg-gray-100 w-full'>
                Printer
              </Link>
              <Link to='/Electronics/Laptop' className='p-2 hover:bg-gray-100 w-full'>
             Laptop
              </Link>
              <Link to='/Electronics/Projector' className='p-2 hover:bg-gray-100 w-full'>
            Projector
              </Link>
              <Link to='/Electronics/Monitor' className='p-2 hover:bg-gray-100 w-full'>
            Monitor
              </Link>
              <Link to='/Electronics/Camera' className='p-2 hover:bg-gray-100 w-full'>
            Cameras
              </Link>
            </div>
          )}
        </Link>
        <Link
          to='/Furniture'
          className='relative'
          onMouseEnter={handleFurnitureHover}
          onMouseLeave={handleLeave}
        >
          <img
            src={furniture}
            alt="Category-furniture"
            className=' w-10 h-10 md:w-14 md:h-14 object-cover'
          />
          <h1 className='md:font-semibold font-light hidden md:flex   text-xs md:text-base'>Furniture</h1>

          {showFurnitureDropdown && (
            <div className='absolute bg-white border font-light text-sm flex flex-col  top-22 -left-2 w-36 border-gray-300 rounded p-2 hover:text-black transition-all z-30 duration-300 shadow-md'>
              <Link to='/subcategory3' className='p-2 hover:bg-gray-100 w-full'>
                Subcategory 3
              </Link>
              <Link to='/subcategory4' className='p-2 hover:bg-gray-100 w-full'>
                Subcategory 4
              </Link>
            </div>
          )}
        </Link>
        <Link
          to='/Appliances'
          className='relative'
          onMouseEnter={handleAppliancesHover}
          onMouseLeave={handleLeave}
        >
          <img
            src={appliance}
            alt="Category-appliance"
            className=' w-10 h-10 md:w-14 md:h-14 object-cover'
          />
          <h1 className='md:font-semibold hidden md:flex font-light  text-xs md:text-base '>Appliances</h1>

          {showAppliancesDropdown && (
            <div className='absolute bg-white border font-light text-sm flex flex-col  top-22 -left-2 w-36 border-gray-300 rounded p-2 hover:text-black transition-all z-30 duration-300 shadow-md'>
              <Link to='/subcategory3' className='p-2 hover:bg-gray-100 w-full'>
                Subcategory 3
              </Link>
              <Link to='/subcategory4' className='p-2 hover:bg-gray-100 w-full'>
                Subcategory 4
              </Link>
            </div>
          )}
        </Link>  
         <Link
          to='/Travel'
          className='relative'
          onMouseEnter={handleTravelHover}
          onMouseLeave={handleLeave}
        >
          <img
            src={travel}
            alt="Category-travel"
            className=' w-10 h-10 md:w-14 md:h-14 object-cover'
          />
          <h1 className='md:font-semibold hidden md:flex font-light  text-xs md:text-base '>Travel</h1>

          {showTravelDropdown && (
            <div className='absolute bg-white border font-light text-sm flex flex-col  top-22 -left-2 w-36 border-gray-300 rounded p-2 hover:text-black transition-all z-30 duration-300 shadow-md'>
              <Link to='/subcategory3' className='p-2 hover:bg-gray-100 w-full'>
                Subcategory 3
              </Link>
              <Link to='/subcategory4' className='p-2 hover:bg-gray-100 w-full'>
                Subcategory 4
              </Link>
            </div>
          )}
        </Link>
        <Link
          to='/Beauty'
          className='relative'
          onMouseEnter={handleBeautyHover}
          onMouseLeave={handleLeave}
        >
          <img
            src={beauty}
            alt="Category-beauty"
            className='w-10 h-10 md:w-14 md:h-14 object-cover'
          />
          <h1 className='md:font-semibold font-light hidden md:flex  text-xs md:text-base -ml-8'>Beauty,Toys & More</h1>

          {showBeautyDropdown && (
            <div className='absolute bg-white border font-light text-sm flex flex-col  top-22 -left-2 w-36 border-gray-300 rounded p-2 hover:text-black transition-all z-30 duration-300 shadow-md'>
              <Link to='/subcategory3' className='p-2 hover:bg-gray-100 w-full'>
                Subcategory 3
              </Link>
              <Link to='/subcategory4' className='p-2 hover:bg-gray-100 w-full'>
                Subcategory 4
              </Link>
            </div>
          )}
        </Link>
        <Link
          to='/Bike'
          className='relative'
          onMouseEnter={handleBikeHover}
          onMouseLeave={handleLeave}
        >
          <img
            src={bike}
            alt="Category-bike"
            className='w-10 h-10 md:w-14 md:h-14 object-cover'
          />
          <h1 className='md:font-semibold hidden md:flex font-light  text-xs md:text-base -ml-6'>Two-Wheelers</h1>

          {showBikeDropdown && (
            <div className='absolute bg-white border font-light text-sm flex flex-col  top-22 -left-2 w-36 border-gray-300 rounded p-2 hover:text-black transition-all z-30 duration-300 shadow-md'>
              <Link to='/subcategory3' className='p-2 hover:bg-gray-100 w-full'>
                Subcategory 3
              </Link>
              <Link to='/subcategory4' className='p-2 hover:bg-gray-100 w-full'>
                Subcategory 4
              </Link>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Category;
