import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BestofFashion = () => {
  const [FashionProducts, setFashionProducts] = useState([]);

  useEffect(() => {
    fetch('https://flipkartclone2-o8uw.onrender.com/api/v1/products/getAllProducts')
      .then((response) => response.json())
      .then((responseData) => {
        console.log('API Response:', responseData);
        const data = responseData.data;

        if (Array.isArray(data)) {
          const electronicsData = data.filter((product) => product.mainCategory === 'Fashion');
          setFashionProducts(electronicsData.slice(0, 7));
        } else {
          console.error('Error fetching products: Unexpected API response format');
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error.message);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className='bg-gray-100 m-2'>
      <h2 className='ml-6 font-semibold text-2xl'>Choose from latest and trendy style</h2>
      <div className='m-3 bg-gray-100 p-2'>
        <Slider {...settings}>
          {FashionProducts.map((product) => (
            <Link key={product._id} to={`/${product.mainCategory}/${product.subCategory}`}>
              <div className='flex flex-col h-64 bg-white  border-gray-200 p-3 justify-center align-middle items-center'>
                <img src={product.images[0]} alt="" className='w-44 h-40 cursor-pointer hover:scale-110' />
                <p className='font-base text-xl'> {product.subCategory}</p>
                <p className='font-semibold'>Starting From Rs{product.price}</p>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestofFashion;
