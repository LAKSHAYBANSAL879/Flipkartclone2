import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-responsive-carousel';

import { useWishlist } from './WishlistProvider';
import flip from "../../Assets/flip.png";
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  console.log("Wishlist data:", wishlist);

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const calculateDelivery = (price) => {
    const deliveryInfo = {
      charge: price > 1000 ? 'Free' : 'Rs 40',
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    };

    return deliveryInfo;
  };
  const filteredWishlist = wishlist.filter((details) => details);
  console.log(filteredWishlist);
  return (
    <div>
      <h2 className='text-xl font-bold ml-10 mt-2'>Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className='flex flex-col align-middle justify-between gap-5'>
          {filteredWishlist.map((details, index) => {
            console.log(details);
            if (!details) {
              return null;
            }

            return (
              <Link to={`/product/${details.name}`} key={index} className='wishlist-item w-5/6 border-2 p-2 justify-around mx-auto align-middle gap-10 flex flex-row'>
                <div className='w-1/4 h-56'>
                <img src={details.images[0]} alt="" className='h-56 w-full'/>
                </div>
                <div className='w-3/4'>
                  <strong className='text-xl font-semibold hover:text-blue-600'>{details.name}</strong>
                  <h1 className='flex'>
                    <FontAwesomeIcon icon={faStar} className='text-yellow-500 text-xl' /> {details.rating}
                    <img src={flip} alt="" className='w-16 h-6 ml-5' />
                  </h1>
                  <p className='flex'>
                    <h1 className='text-2xl font-bold'>
                      <FontAwesomeIcon icon={faIndianRupeeSign} />{details.price}
                    </h1>
                  </p>
                  <p className='text-md'>{`Delivery: ${calculateDelivery(details.price).charge}`}</p>
                  <p className='text-md'> Est. Delivery Date: {calculateDelivery(details.price).date.toDateString()}</p>
                  <p className='text-green-500 font-bold'>Bank Offers Available</p>
                </div>
                <div>
                  <button
                    className='wishlist-item-remove'
                    onClick={() => handleRemoveFromWishlist(details._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
