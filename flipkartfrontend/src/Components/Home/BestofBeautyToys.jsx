import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BestofBeautyToys = () => {
  const [beautyProducts, setBeautyProducts] = useState([]);

  useEffect(() => {
   
    fetch('https://flipkartclone2-o8uw.onrender.com/api/v1/products/getAllProducts')
      .then((response) => response.json())
      .then((responseData) => {
        console.log('API Response:', responseData); 
        const data = responseData.data; 

        if (Array.isArray(data)) {
          const beautyData = data.filter((product) => product.mainCategory === 'Beauty');
          setBeautyProducts(beautyData.slice(0, 7));
        } else {
          console.error('Error fetching products: Unexpected API response format');
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error.message);
      });
  }, []);

  return (
    <div className='bg-gray-100 m-2'>
      <h2 className='ml-6 font-bold text-2xl'>Best of Beauty,Toys & More</h2>
      <div className='flex flex-row gap-4 m-3 bg-gray-100 p-2'>
        {beautyProducts.map((product) => (
          <Link key={product._id} to={`/${product.mainCategory}/${product.subCategory}`}>
            <div className='flex flex-col bg-white border-2 border-gray-200 p-3 justify-center align-middle items-center'>
              <img src={product.images[0]} alt="" className='w-48 h-48  hover:scale-110 cursor-pointer' />
              <p className='font-bold text-xl'> {product.subCategory}</p>
              <p className='font-semibold'>Starting From Rs{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestofBeautyToys;
