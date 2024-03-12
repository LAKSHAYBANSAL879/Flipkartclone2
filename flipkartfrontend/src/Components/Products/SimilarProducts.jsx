import React, { useState, useEffect, useContext } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faIndianRupeeSign, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import flip from '../../Assets/flip.png';
import { WishlistContext } from '../Wishlist/WishlistProvider';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SimilarProducts = ({ mainCategory, subCategory, currentProductId }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToWishlist, removeFromWishlist, isProductInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await fetch(`https://flipkartclone2-o8uw.onrender.com/api/v1/products/getAllProducts`);

        if (!response.ok) {
          throw new Error(`Failed to fetch similar products. Status: ${response.status}`);
        }

        const data = await response.json();

        const productsData = data.data || data.products;

        const filteredProducts = productsData.filter(
          (product) =>
            product.mainCategory === mainCategory &&
            product.subCategory === subCategory &&
            product._id !== currentProductId
        );

        setSimilarProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching similar products:', error.message);
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [mainCategory, subCategory, currentProductId]);

  if (loading) {
    return <div>Loading similar products...</div>;
  }

  const handleWishlistAction = (productId, productDetails) => {
    if (isProductInWishlist(productId, productDetails)) {
      removeFromWishlist(productId);
      console.log(`Removed product with ID ${productId} from wishlist`);
    } else {
      addToWishlist(productId, productDetails);
      console.log(`Added product with ID ${productId} to wishlist`);
    }
  };
 
  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
   
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
 
  return (
    <div className='bg-gray-200 w-full px-6 py-4 mt-4 mb-3'>
      <h2 className='font-bold text-2xl mb-4'>Similar Products</h2>
      <Slider {...sliderSettings}>
        {similarProducts.map((product) => (
          <div key={product._id} className='w-full px-2'>
            <div className='flex flex-col relative justify-between items-center h-full p-4 border border-gray-300'>
              <img src={product.images[0]} alt={product.name} className='w-full h-48 object-cover mb-4' />
              <FontAwesomeIcon
  icon={faHeart}
  onClick={() => handleWishlistAction(product._id, product)}
  className={`text-2xl cursor-pointer absolute top-0 right-0 mt-2 mr-2 ${
    isProductInWishlist(product._id, product) ? 'text-red-500' : ''
  }`}
/>

              <p className='text-sm mt-2 mb-4'>{product.name}</p>
              <div className='flex flex-row justify-around mb-4'>
                <h1 className='bg-green-600 p-1 text-sm text-white font-semibold'>
                  {product.rating}
                  <FontAwesomeIcon icon={faStar} />
                </h1>
                <h1 className='text-gray-400'>(320)</h1>
                <img src={flip} alt='' className='w-8 h-4' />
              </div>
              <div className='flex flex-row justify-between'>
                <h1 className='font-bold text-lg'>
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                  {product.price}
                </h1>
                <div className='flex flex-col items-end'>
                  <h1 className='font-semibold text-sm line-through text-gray-400'>
                    <FontAwesomeIcon icon={faIndianRupeeSign} />
                    {product.mrp}
                  </h1>
                  <h1 className='text-green-600 font-bold text-sm'>
                    {(((product.mrp - product.price) / product.mrp) * 100).toFixed(0)}%
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimilarProducts;