import React, { useContext } from "react";
import { useCart } from "../../CartContext";
import { UserContext } from "../../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import PriceBreakup from "./PriceBreakup";
import { Link } from "react-router-dom";

const Cart = () => {
  const { addToCart, cartItems, removeFromCart, removeFromCartCompletely, getTotalItems, getTotalCost } = useCart();
  const { user } = useContext(UserContext);

  const handleRemoveOne = (productId,item) => {
    if (cartItems[productId]?.quantity > 1) {
      removeFromCart(productId);
    } else {
      removeFromCartCompletely(productId);
    }
  };

  const calculateDelivery = (price) => {
    const deliveryInfo = {
      charge: price > 1000 ? "Free" : "40",
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    };

    return deliveryInfo;
  };
  return (
    <div className="bg-gray-50 w-full h-full">
      <div className="flex flex-row w-full lg:w-3/4 mx-auto bg-white m-3 p-4 ">
        <div className="flex flex-col gap-3 w-full md:w-2/3">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Thank you for shopping on Flipkart!</h1>
          </div>
          <div className="mb-4">
            <h1 className="text-lg font-medium">Deliver to: {user.name}</h1>
            <p className="text-gray-600">{user.address}</p>
          </div>
          <div className="flex flex-col gap-10">
            {Object.entries(cartItems).map(([productId, item]) => (
              <div key={productId} className="flex flex-row align-middle items-center gap-4 border-b pb-2">
                <div className="max-w-56 p-3 max-h-24">
                  <img src={item.image} alt={item.name} className="mr-2 min-w-48 max-w-48 max-h-24" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-base font-medium ">{item.name}</h1>
                  <h1>Size:{item.size}</h1>
                  <div className="flex flex-row gap-3">
                    <p className="text-black text-xl font-bold">
                      <FontAwesomeIcon icon={faIndianRupeeSign} />
                      {item.price}
                    </p>
                    <p className="text-gray-400 mt-1 line-through text-base font-semibold">
                      <FontAwesomeIcon icon={faIndianRupeeSign} />
                      {item.mrp}
                    </p>
                    <h1 className="text-green-600 font-bold mt-1 text-lg">{((item.mrp-item.price) / (item.mrp)*100).toFixed(0)}%</h1>
                  </div>
                  <div className="flex flex-row items-center gap-10">
                    <div className="flex flex-row gap-2">
                      <button
                        className="rounded-full px-2 m-auto p-auto text-2xl flex items-center font-semibold border-2"
                        onClick={() => handleRemoveOne(productId,item)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <h1 className="border-2 px-4  py-1 text-2xl font-bold">{item.quantity}</h1>
                      <button
                        className="rounded-full px-2 m-auto p-auto text-2xl flex items-center font-semibold border-2"
                        onClick={()=>addToCart(productId,{name:item.name,price:item.price,mrp:item.mrp},item.size)}
                      >
                        +
                      </button>
                    </div>
                    <button onClick={() => removeFromCartCompletely(productId)} className="text-red-500">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  
                </div>
                <div>
                <p className="text-md lg:block hidden">
                Delivery by{" "}
                {calculateDelivery(
                  item.price
                ).date.toDateString()}{" "}
                | {calculateDelivery(item.price).charge}
              </p>
                    </div>
              </div>
            ))}
            <div>
                <Link to="/checkout"><button className="bg-orange-500 text-white p-2 font-bold text-xl ">Checkout</button></Link>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <PriceBreakup/>
        </div>
      </div>
    </div>
  );
};

export default Cart;
