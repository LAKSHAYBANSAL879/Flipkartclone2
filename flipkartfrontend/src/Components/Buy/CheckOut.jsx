import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faX,
  faIndianRupeeSign,
  faTrash,
  faCcMastercard,
  faMoneyBill,
  faCoins
} from "@fortawesome/free-solid-svg-icons";
import PriceBreakup from "./PriceBreakup";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
import card from "../../Assets/cc-mastercard.svg"
import { toast } from "react-toastify";
const CheckOut = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addressDetails, setAddressDetails] = useState({});
  
 
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [showPaymentSection,setShowPaymentSection]=useState(false);
  const {
    addToCart,
    cartItems,
    removeFromCart,
    removeFromCartCompletely,
    getTotalCost,
    clearCart,
    supercoinsEarned
  } = useCart();
  const { user, setUser } = useContext(UserContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
const Navigate=useNavigate();
  const handleLoginCheck = () => {
    if (user) {
      setIsLoggedIn(true);
    }
  };
  const handleRemoveOne = (productId, item) => {
    if (cartItems[productId]?.quantity > 1) {
      removeFromCart(productId);
    } else {
      removeFromCartCompletely(productId);
    }
  };
  const handleAddressSubmit = async (address) => {
    try {
      const response = await fetch(
        "https://flipkartclone2-o8uw.onrender.com/api/v1/address/addAddress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            houseNo: address.houseNo,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            name: address.name,
            userName: user.name,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAddressDetails(data);
        setShowAddAddressForm(false);
      } else {
        console.error("Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        "https://flipkartclone2-o8uw.onrender.com/api/v1/address/getAddress",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const filteredData = data.filter(
          (address) => address.userName === user.name
        );
        setAddresses(filteredData);
      } else {
        console.error("Failed to fetch addresses");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    handleLoginCheck();
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setAddressDetails(address);
  };
  const handleAddAddressClick = () => {
    console.log("Before: showAddAddressForm", showAddAddressForm);
    setShowAddAddressForm(true);
    console.log("After: showAddAddressForm", showAddAddressForm);
  };
  const handlePlaceOrder = async () => {
    try {
     
      const response = await fetch(
        "https://flipkartclone2-o8uw.onrender.com/api/v1/order/addOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userInfo: {
              name: user.name,
              email: user.email,
            },
            deliveryAddress: {
              ...selectedAddress,
            },
            cartTotal: {
              totalamt: getTotalCost(),
            },
            modeofPayment: selectedPaymentMethod,
            supercoinsEarned:supercoinsEarned(),
            cartItems: Object.values(cartItems),
          }),
        }
      );

      if (response.ok) {
        toast.success("Order Placed successfully");
      
        const data = await response.json();
        console.log(data);
        Navigate(`/ordersuccess/${data.order._id}`);
        clearCart();
      } else {
        console.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  const handlePaymentCheckboxChange = (method) => {
    setSelectedPaymentMethod(method);
  };
  const handlePayment = async (method) => {
    if (method === "razorpay") {
      setSelectedPaymentMethod("online");
      try {
        const paymentDetails = {
          amount: getTotalCost(),
          currency: "INR",
        };

        const response = await fetch(
          "https://flipkartclone2-o8uw.onrender.com/api/v1/payment/payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentDetails),
          }
        );
        console.log(paymentDetails);

        if (response.ok) {
          const result = await response.json();
          const options = {
            key: "rzp_test_A2R3CIVSwB7kIN",
            amount: result.paymentResponse.amount,
            currency: "INR",
            name: "Lakshay Bansal",
            description: "Payment integration",
            image: "https://example.com/your_logo",
            order_id: result.paymentResponse.id,
            callback_url:
              "https://flipkartclone2-o8uw.onrender.com/api/v1/payment/paymentVerification",
            prefill: {
              name: "Lakshay Bansal",
              email: "lakshayBansal@example.com",
              contact: "9000090000",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };
          const razor = new window.Razorpay(options);
          razor.open();
          await handlePlaceOrder();
          console.log("Payment successful", result);
        } else {
          console.error("Payment failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error in handlePayment:", error.message);
      }
    } else if (method === "cashOnDelivery") {
      await handlePlaceOrder();
      setSelectedPaymentMethod("cash on delivery");
      
    }
  };
  const changePaymentVisibility=()=>{
    setShowPaymentSection(true);
  }
  return (
    <div className="bg-gray-100 flex flex-row justify-center">
      <div className="bg-gray-100 flex flex-col gap-2 w-2/3">
        {isLoggedIn && (
          <div className="bg-white p-2 mt-4">
            {user ? (
              <div className="flex flex-row justify-between">
                <div className="ml-10">
                  <h2 className="text-xl font-bold text-gray-400">
                    <span className="border-2 text-blue-500 px-2">1</span> LOGIN{" "}
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="ml-4 text-blue-500"
                    />
                  </h2>
                  <p className="font-bold">Welcome, {user.name}</p>
                  <p>+91 {user.phone}</p>
                </div>
                <div className="mr-10 mt-2">
                  <Link to="/signin">
                    <button className="font-bold text-blue-500 border-2 p-2">
                      Change
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-row justify-between">
                <div className="ml-10">
                  <h2 className="text-xl font-bold text-gray-400">
                    <span className="border-2 text-blue-500 px-2">1</span> LOGIN{" "}
                    <FontAwesomeIcon icon={faX} className="ml-4 text-red-500" />
                  </h2>
                  <h1>Please Login to Continue</h1>
                </div>
                <div className="mr-10">
                  <Link to="/signin">
                    <button className="font-bold text-blue-500 border-2 p-2">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {user && addresses.length === 0 && (
          <div>
            <h2>No Address Saved</h2>
            {!showAddAddressForm && (
              <button onClick={() => setShowAddAddressForm(true)}>
                Add Address
              </button>
            )}
            {showAddAddressForm && (
              <div className="bg-blue-100 w-full text-base">
                <h2>Add Address</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const address = {
                      houseNo: formData.get("houseNo"),
                      city: formData.get("city"),
                      state: formData.get("state"),
                      pincode: formData.get("pincode"),
                      name: formData.get("name"),
                    };
                    handleAddressSubmit(address);
                  }}
                >
                  <label>
                    House No:
                    <input type="text" name="houseNo" required />
                  </label>
                  <label>
                    City:
                    <input type="text" name="city" required />
                  </label>
                  <label>
                    State:
                    <input type="text" name="state" required />
                  </label>
                  <label>
                    Pincode:
                    <input type="text" name="pincode" required />
                  </label>
                  <label>
                    Name:
                    <input type="text" name="name" required />
                  </label>
                  <button type="submit">Submit Address</button>
                </form>
              </div>
            )}
          </div>
        )}

        {user && addresses.length > 0 && (
          <div className="bg-white p-2 mt-2">
            <h2 className="ml-10 text-gray-400 font-bold text-xl">
              <span className="text-blue-500 px-2 border-2 mr-1">2</span>
              Delivery Address
              <FontAwesomeIcon icon={faCheck} className="text-blue-500 ml-2" />
            </h2>
            <div className="ml-10">
              {addresses.map((address) => (
                <div key={address._id} className="address-item">
                  <label>
                    <input
                      type="radio"
                      name="address"
                      checked={
                        selectedAddress && selectedAddress._id === address._id
                      }
                      onChange={() => handleAddressSelect(address)}
                    />
                    <span className="font-bold">{address.name}</span>{" "}
                    {address.houseNo} {address.city} {address.state}{" "}
                    {address.pincode}
                  </label>
                </div>
              ))}
              {showAddAddressForm && (
                <div className="bg-blue-100 text-base flex w-3/4 p-2 m-2 flex-col flex-wrap gap-3">
                  <h2 className="font-bold">Add New Address</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const address = {
                        houseNo: formData.get("houseNo"),
                        city: formData.get("city"),
                        state: formData.get("state"),
                        pincode: formData.get("pincode"),
                        name: formData.get("name"),
                      };
                      handleAddressSubmit(address);
                    }}
                    className="flex flex-row h-64 flex-wrap gap-6 "
                  >
                    <label className="font-bold">
                      House No:
                      <input type="text" name="houseNo" required />
                    </label>
                    <label className="font-bold">
                      City:
                      <input type="text" name="city" required />
                    </label>
                    <label className="font-bold">
                      State:
                      <input type="text" name="state" required />
                    </label>
                    <label className="font-bold">
                      Pincode:
                      <input type="text" name="pincode" required />
                    </label>
                    <label className="font-bold">
                      Name:
                      <input type="text" name="name" required />
                    </label>
                    <div className="relative top-8 right-16">
                      <button
                        type="submit"
                        className="bg-orange-500 text-white font-bold p-2"
                      >
                        Submit Address
                      </button>
                    </div>
                  </form>
                </div>
              )}
              <button
                onClick={handleAddAddressClick}
                className="ml-6 p-2 border-2 text-blue-500 mt-2"
              >
                Add More Address
              </button>
            </div>
          </div>
        )}
        {selectedAddress && (
          <div className="flex bg-white flex-col gap-10">
            <h1 className="bg-blue-500 text-white pl-10 font-bold text-xl">
              <span className="border-2  px-2 mr-1">3</span>Order Summary
            </h1>

            {Object.entries(cartItems).map(([productId, item]) => (
              <div
                key={productId}
                className="flex flex-row align-middle items-center gap-4 border-b pb-2"
              >
                <div className="max-w-56 p-3 ">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="mr-2 min-w-48 max-w-48 max-h-32"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-base font-medium ">{item.name}</h1>
                  <h1>Size: {item.size}</h1>
                  <div className="flex flex-row gap-3">
                    <p className="text-black text-xl font-bold">
                      <FontAwesomeIcon icon={faIndianRupeeSign} />
                      {item.price}
                    </p>
                    <p className="text-gray-400 mt-1 line-through text-base font-semibold">
                      <FontAwesomeIcon icon={faIndianRupeeSign} />
                      {item.mrp}
                    </p>
                    <h1 className="text-green-600 font-bold mt-1 text-lg">
                      {(((item.mrp - item.price) / item.mrp) * 100).toFixed(0)}%
                    </h1>
                  </div>
                  <div className="flex flex-row items-center gap-10">
                    <div className="flex flex-row gap-2">
                      <button
                        className="rounded-full px-2 m-auto p-auto text-2xl flex items-center font-semibold border-2"
                        onClick={() => handleRemoveOne(productId, item)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <h1 className="border-2 px-4  py-1 text-2xl font-bold">
                        {item.quantity}
                      </h1>
                      <button
                        className="rounded-full px-2 m-auto p-auto text-2xl flex items-center font-semibold border-2"
                        onClick={() =>
                          addToCart(productId, {
                            name: item.name,
                            price: item.price,
                            mrp: item.mrp,
                          },
                          item.size)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCartCompletely(productId)}
                      className="text-red-500"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  <h1 className="font-semibold">You will earn <FontAwesomeIcon icon={faCoins} className="text-yellow-500 mr-1"/><span className="text-xl font-bold font-mono">{supercoinsEarned().toFixed(0)}</span> with this order</h1>

                </div>
                
              </div>
             
            ))}
             <div className="flex w-full justify-between"> 
             <p className="p-3">Order Confirmation mail would be sent to <span className="font-bold">{user.email}</span></p>
              <button onClick={changePaymentVisibility} className="bg-orange-500 text-white p-2 font-bold text-xl mr-3 mb-2">Confirm</button>
              </div>
          </div>
        )}
  {showPaymentSection && (
 <div className=" bg-white justify-start">
 <h2 className="bg-blue-500 text-white font-bold text-xl pl-10 ">
   <span className="border-2 px-2 mr-2">4</span>Payment Section
 </h2>
 <div className="flex flex-col ml-10 text-xl font-bold">
   <label htmlFor="">
     <input
       type="checkbox"
       name=""
       id=""
       checked={selectedPaymentMethod === 'razorpay'}
       onChange={() => handlePaymentCheckboxChange('razorpay')}
     />
     <button>
       <div className="flex flex-row mt-2">
         <img src={card} alt="" className="w-16 h-8" />
         <h1>Pay Online</h1>
       </div>
     </button>
   </label>

   <label htmlFor="">
     <input
       type="checkbox"
       name=""
       id=""
       checked={selectedPaymentMethod === 'cashOnDelivery'}
       onChange={() => handlePaymentCheckboxChange('cashOnDelivery')}
      
     />
     <button>
       <FontAwesomeIcon icon={faMoneyBill} className="mr-2 text-green-500" />Cash on Delivery
     </button>
   </label>

   {selectedPaymentMethod && (
     <button onClick={() => handlePayment(selectedPaymentMethod)} className="mt-4 bg-blue-500 text-white px-4 py-2">
       Continue
     </button>
   )}
 
 </div>
 </div>
 
)}
</div>
 

      <div className="w-1/4">
        <PriceBreakup />
      </div>
    </div>
   
  );
};

export default CheckOut;
