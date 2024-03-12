import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import sc from "../../Assets/sc.png";
import orderPlaced from "../../Assets/orderplaced.png";
import orderbox from "../../Assets/orderbox.png";
import {
  faStar,
  faHeart,
  faIndianRupeeSign,
  faCoins,
  faMessage,
  faXmark,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import emailjs from "emailjs-com";
const OrderSuccess = () => {
  const { user, setUser } = useContext(UserContext);
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [complaintMessage, setComplaintMessage] = useState("");
  const [username, setUserName] = useState(user?.name);
  const [useremail, setUserEmail] = useState("");
  const [usermobile, setUserMobile] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/order/getOrder/${orderId}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch product details. Status: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("Order Details:", data);

        setOrderDetails(data);
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };

    fetchProductDetails();
  }, [orderId]);
  const openModal = (orderDetails) => {
    setSelectedOrder(orderDetails);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setComplaintMessage('');
    setUserName('');
    setUserEmail('');
    setUserMobile('');
  };

  const handleComplaintSubmit = async () => {
    if (selectedOrder) {
      try {
        const templateParams = {
          to_name: 'Lakshay Bansal',
          from_name: username,
          message: complaintMessage,
          email: useremail,
          mobile: usermobile,
        };
        await emailjs.send('service_ewumrwj', 'template_w41gkya', templateParams, 'Sx4o6vx7xG2hKlQda');

        alert('Email sent successfully!');
        closeModal();
      } catch (error) {
        console.log('Error sending email:', error);
      }
    }
  };
  const customModalStyles = {
    content: {
      width: '900px', 
      height: '500px',
      margin: 'auto', 
    },
  };
  return (
    <div className="flex flex-col bg-gray-100 overflow-hidden">
        <div className="flex flex-row bg-white m-7 p-5  w-full">
<div className="w-2/3 flex flex-row align-middle items-center border-r-2" >
<img src={orderPlaced} alt="" className="w-32 h-32"/>
<div className="flex flex-col ">
    <h1 className="text-3xl font-bold text-blue-500 mr-2 ml-2">Order placed for <FontAwesomeIcon icon={faIndianRupeeSign}/>{orderDetails?.order?.cartTotal?.totalamt}!</h1>
    <h1 className="ml-2 mt-1">Your item will be delivered within 3 days</h1>
</div>
</div>
<div className="w-1/3 flex flex-row align-middle ml-2 justify-around" >
    <div className="flex flex-col">
        <h1 className="font-semibold text-lg">Why call? Just click!</h1>
        <h1>Easily track all your Flipkart orders!</h1>
<Link to='/orders' className="bg-blue-500 text-white w-fit p-1 mt-2">Go to My orders</Link>
    </div>
    <div>
        <img src={orderbox} alt="" className="w-32 h-auto "/>
    </div>
</div>
<div>

</div>
        </div>
      <div className="flex flex-row bg-white ml-7 mb-3 p-5  w-full">
        <div className="flex flex-col border-r-4 w-1/3">
          <h1 className="font-bold text-xl">Delivery Address</h1>
          <h1 className="text-lg font-semibold">
            {orderDetails?.order?.deliveryAddress.name}
          </h1>
          <p>
            House/Flat no: {orderDetails?.order.deliveryAddress.houseNo}{" "}
            {orderDetails?.order.deliveryAddress.city}
          </p>
          <p>
            {orderDetails?.order?.deliveryAddress?.state}{" "}
            {orderDetails?.order.deliveryAddress.pincode}
          </p>
          <h1 className="font-semibold text-lg">Phone Number</h1>
          <p>{user?.phone}</p>
        </div>
        <div className="flex flex-col w-1/2 ml-5 border-r-4">
          <h1 className="font-bold text-2xl">Your Rewards</h1>
          <h1 className="text-xl font-bold flex">
            <img src={sc} className="w-4 h-4 mt-1 mr-1" alt="" />
            {(orderDetails?.order?.supercoinsEarned)} Supercoins{" "}
            <span className="font-semibold text-lg ml-1">
              credit to your account successfully
            </span>
          </h1>
          <h1 className="flex flex-row gap-2">
            Enjoy your purchase<p className="bg-white">😎</p>
          </h1>
        </div>
        <div className="w-1/3 ml-4">
          <h1 className="font-bold">More actions</h1>
          <h1>Download your invoice</h1>
        </div>
      </div>
      <div className="ml-7  mb-10 p-5 flex flex-row bg-white w-full">
        <div className="flex flex-col w-1/2">
          {orderDetails?.order?.cartItems.map((cartItem) => (
            <div key={cartItem._id} className="flex flex-col">
              <div className="flex flex-row w-3/4">
                <img src={cartItem.image} alt="" className="w-24 h-16" />
                <div className="flex flex-col">
                  <h1 className="ml-3">{cartItem.name}</h1>
                  
                  <h1 className="ml-3">
                    Product Quantity purchased : {cartItem.quantity}
                  </h1>
                </div>
              </div>
            </div>
          ))}
          <div className="ml-28 font-bold text-xl text-green-500">
            <FontAwesomeIcon icon={faIndianRupeeSign} />
            {orderDetails?.order?.cartTotal?.totalamt}
          </div>

          <div>
            <h1>return policy valid till 30 days after purchase of product</h1>
          </div>
        </div>
        <div className="w-1/2 flex flex-row">
          <div className="w-2/3">
           <h1><FontAwesomeIcon icon={faTruck} className="text-blue-500"/> Delivery exprected within 3 days</h1>
           <button onClick={() => openModal(orderDetails)} className="mt-2 bg-blue-500 text-white  p-2 rounded-md">
                    <FontAwesomeIcon icon={faMessage} className="pr-2" />Need Help ?
                  </button>
          </div>
          <div className="w-1/3">
            <h1 className="text-lg"> <FontAwesomeIcon icon={faIndianRupeeSign} />
            {orderDetails?.order?.cartTotal?.totalamt} <span className="text-green-500">2 offers applied</span></h1>
          </div>
        </div>
      </div>
      <Modal isOpen={selectedOrder !== null} onRequestClose={closeModal} contentLabel="Complaint/Query Form" ariaHideApp={false} style={customModalStyles}>
        <h2 className="text-2xl font-bold mb-4">Complaint Form - Order #{orderDetails?.order?._id}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleComplaintSubmit();
          }}
        >
          <label htmlFor="name" className="block text-xl font-bold text-gray-700">
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={user?.name}
            onChange={(e) => setUserName(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          ></input>

          <label htmlFor="email" className="block text-xl font-bold text-gray-700">
            Email:
          </label>
          <input
            type="mail"
            id="email"
            name="email"
            value={useremail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          ></input>

          <label htmlFor="mobile" className="block text-xl font-bold text-gray-700">
            Contact Number :
          </label>
          <input
            id="mobile"
            name="mobile"
            type="number"
            value={usermobile}
            onChange={(e) => setUserMobile(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          ></input>

          <label htmlFor="complaint" className="block text-xl font-bold text-gray-700">
            Complaint/Query:
          </label>
          <textarea
            id="complaint"
            name="complaint"
            rows="3"
            value={complaintMessage}
            onChange={(e) => setComplaintMessage(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
          ></textarea>
          <div className="flex justify-end mt-4">
            <button type="submit" className="mr-2 bg-red-500 text-white p-2 rounded-md">
              Submit Complaint
            </button>
            <button onClick={closeModal} className="relative bottom-96 bg-gray-300 text-gray-700 p-2 rounded-md">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default OrderSuccess;
