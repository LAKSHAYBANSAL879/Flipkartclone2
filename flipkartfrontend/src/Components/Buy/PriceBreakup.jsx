import React, { useState } from 'react';
import { useCart } from '../../CartContext';
import promo from '../../Assets/promo.avif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const PriceBreakup = () => {
  const { cartItems, getTotalItems, getTotalCost, getTotalMrp } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalDiscountedCost, setFinalDiscountedCost] = useState(0);

  const applyCoupon = () => {
   
    if (couponCode === 'SAVE10') {
      setDiscount(10); 
    } else if (couponCode === 'SAVE20') {
      setDiscount(20); 
    } else if (couponCode === 'MEGADISCOUNT30') {
      setDiscount(30);
    } else {
      setDiscount(0);
    }

    
    const totalCost= getTotalCost();
    const discountedAmount = (totalCost * discount) / 100;
    setFinalDiscountedCost(totalCost - discountedAmount);
  };

  return (
    <div className="ml-4">
      <div className="flex ml-4 flex-col">
        <h1 className="text-gray-500 border-b-2 font-semibold text-base">Price Details</h1>
        <div className="flex flex-row justify-around">
          <div className="w-full">
            <div className="bg-white text-black p-4 rounded-md">
              <h1 className="flex justify-between">
                Total Mrp of {getTotalItems()} items
                <span className="font-medium text-base ">
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                  {getTotalMrp()}
                </span>
              </h1>
              <ul className="mb-4 border-b-2 mt-2">
                {Object.entries(cartItems).map(([productId, item]) => (
                  <li key={productId} className="flex justify-between items-center mb-2">
                    <span>
                      {item.quantity}x{item.name.slice(0, 15)}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faIndianRupeeSign} />
                      {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="font-semibold flex justify-between border-b-2">
                Total Cost after discount{' '}
                <span className="font-bold text-xl text-green-500">
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                  {finalDiscountedCost || getTotalCost()}
                </span>
              </p>

              {discount > 0 && (
                <p className="text-green-500 ml-3 mt-2 font-bold">
                  Discount Applied by coupon:{' '}
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                  {((getTotalMrp() * discount) / 100).toFixed(2)}
                </p>
              )}
              <p className="text-green-500 ml-3 mt-2 font-bold">
                You will save{' '}
                <FontAwesomeIcon icon={faIndianRupeeSign} />
                {(getTotalMrp() - (finalDiscountedCost || getTotalCost())).toFixed(2)} on this order
              </p>
              <div className="mt-4">
                <label className="text-gray-600 font-medium">Coupon Code:</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="border p-2 w-full"
                  />
                  <button
                    className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
                    onClick={applyCoupon}
                  >
                    Apply
                  </button>
                  
                </div>
                <p className='text-gray-500 text-sm font-extralight'>Discounted cost will be credited to your flipkart wallet </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src={promo} alt="" className="w-3/4 mx-auto" />
      </div>
    </div>
  );
};

export default PriceBreakup;
