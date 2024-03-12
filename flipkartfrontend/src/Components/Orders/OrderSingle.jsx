import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './OrderSingle.css'
import sc from "../../Assets/sc.png"
import {
  faStar,
  faHeart,
  faIndianRupeeSign,
  faCoins,faMessage,faXmark
} from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
import emailjs from 'emailjs-com';
const OrderSingle = () => {
  const { user, setUser } = useContext(UserContext);
const {orderId}=useParams();
const [orderDetails, setOrderDetails] = useState(null);
const [complaintMessage, setComplaintMessage] = useState('');
const [username, setUserName] = useState(user?.name);
const [useremail, setUserEmail] = useState('');
const [usermobile, setUserMobile] = useState('');
const [selectedOrder, setSelectedOrder] = useState(null);
    useEffect(() => {
        const fetchProductDetails = async () => {
          try {
            const response = await fetch(
              `https://flipkartclone2-o8uw.onrender.com/api/v1/order/getOrder/${orderId}`
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
      const handleColor = (deliveryStatus) => {
        switch (deliveryStatus) {
          case "placed":
            return <h1 className="text-blue-500">Placed</h1>;
          case "delivered":
            return <h1 className="text-green-500">Delivered</h1>;
          case "shipped":
            return <h1 className="text-black">Shipped</h1>;
          case "out for delivery":
            return <h1 className="text-green-600">Out for delivery</h1>;
          default:
            return null;
        }
    };
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
    const getProgressBarClass = (deliveryStatus) => {
      switch (deliveryStatus) {
        case "placed":
          return "placed-progress";
        case "shipped":
          return "shipped-progress";
        case "out for delivery":
          return "out-for-delivery-progress";
        case "delivered":
          return "delivered-progress";
        default:
          return "";
      }
    };

    const getStopClass = (stopStatus, deliveryStatus) => {
      switch (stopStatus) {
        case "Placed":
          return deliveryStatus === "placed" ? "active-stop" : "inactive-stop";
        case "Shipped":
          return deliveryStatus === "shipped" ? "active-stop" : "inactive-stop";
        case "Out for Delivery":
          return deliveryStatus === "out for delivery" ? "active-stop" : "inactive-stop";
        case "Delivered":
          return deliveryStatus === "delivered" ? "active-stop" : "inactive-stop";
          case "cancelled":
          return <h1 className="text-red-500">Cancelled</h1>
        default:
          return "";
      }
    };
    const customModalStyles = {
      content: {
        width: '900px', 
        height: '500px',
        margin: 'auto', 
      },
    };
    const handleCancelOrder = async () => {
      const confirmation = window.confirm("Are you sure you want to cancel this order?");
      if (confirmation) {
        try {
          const response = await fetch(
            `https://flipkartclone2-o8uw.onrender.com/api/v1/order/updateOrder/${orderId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ deliveryStatus: "cancelled" }),
            }
          );
  
          if (response.ok) {
           
            alert("Order cancelled successfully!");
          } else {
            
            console.error("Failed to cancel order");
          }
        } catch (error) {
          console.error("Error cancelling order:", error);
        }
      }
    };
  
  return (
    <div className='flex flex-col bg-gray-100 overflow-hidden'>
        <div className='flex flex-row bg-white m-10 p-5  w-full'>
            <div className='flex flex-col border-r-4 w-1/3'>
                <h1 className='font-bold text-xl'>Delivery Address</h1>
                <h1 className='text-lg font-semibold'>{orderDetails?.order?.deliveryAddress.name}</h1>
                <p>House/Flat no: {orderDetails?.order.deliveryAddress.houseNo} {orderDetails?.order.deliveryAddress.city}</p>
                <p>{orderDetails?.order?.deliveryAddress?.state} {orderDetails?.order.deliveryAddress.pincode}</p>
                <h1 className='font-semibold text-lg'>Phone Number</h1>
                <p>{user?.phone}</p>
            </div>
            <div className='flex flex-col w-1/2 ml-5 border-r-4'>
<h1 className='font-bold text-2xl'>Your Rewards</h1>
<h1 className='text-xl font-bold flex'><img src={sc} className='w-4 h-4 mt-1 mr-1' alt="" />{(orderDetails?.order?.supercoinsEarned)} Supercoins <span className='font-semibold text-lg ml-1'>credit to your account successfully</span></h1>
<h1 className='flex flex-row gap-2'>Enjoy your purchase<p className='bg-white'>😎</p></h1>
            </div>
            <div className='w-1/3 ml-4'>
              <h1 className='font-bold'>More actions</h1>
              <h1>Download your invoice</h1>
            </div>
        </div>
        <div className='ml-10  mb-10 p-5 flex flex-row bg-white w-full'>
          <div className='flex flex-col w-1/2'>
            {orderDetails?.order?.cartItems.map((cartItem)=>(
              <div key={cartItem._id} className='flex flex-col'>
<div className='flex flex-row w-3/4'>
<img src={cartItem.image} alt="" className='w-24 h-16'/>
<div className='flex flex-col'>
<h1 className='ml-3'>{cartItem.name}</h1>
<h1 className='ml-3'>Size:{cartItem.size || "-----"}</h1>
<h1 className='ml-3'>Product Quantity purchased : {cartItem.quantity}</h1>
</div>

</div>
              </div>
            ))}
            <div className='ml-28 font-bold text-xl text-green-500'><FontAwesomeIcon icon={faIndianRupeeSign}/>{orderDetails?.order?.cartTotal?.totalamt}</div>

<div>
  <h1>return policy valid till 30 days after purchase of product</h1>
</div>
          </div>
          <div className='w-1/2'>
            
            <div className='w-2/3'>
          <label htmlFor="deliveryStatus" className="block text-xl font-bold text-gray-700 mb-2">
            Delivery Status:
          </label>
          <div className="progress-bar">
         
            <div className={`progress ${getProgressBarClass(orderDetails?.order?.deliveryStatus)}`}></div>
            <div className="stops">
              <div className={`stop ${getStopClass("Placed", orderDetails?.order?.deliveryStatus)}`}>Placed</div>
              <div className={`stop ${getStopClass("Shipped", orderDetails?.order?.deliveryStatus)}`}>Shipped</div>
              <div className={`stop ${getStopClass("Out for Delivery", orderDetails?.order?.deliveryStatus)}`}>Out for Delivery</div>
              <div className={`stop ${getStopClass("Delivered", orderDetails?.order?.deliveryStatus)}`}>Delivered</div>
            </div>
          </div>
          <div className="">
  {handleColor(orderDetails?.order?.deliveryStatus)}
</div>
        </div>
        {orderDetails?.order?.deliveryStatus==="placed" && (
 <button
 onClick={handleCancelOrder}
 className="mt-2 bg-red-500 text-white p-2 rounded-md"
>
 Cancel Order
</button>
        )}
       
            <h1 className="text-blue-500 mt-2"><FontAwesomeIcon icon={faStar}/> Rate your Product</h1>
            <button onClick={() => openModal(orderDetails)} className="mt-2 bg-blue-500 text-white  p-2 rounded-md">
                    <FontAwesomeIcon icon={faMessage} className="pr-2" />Need Help ?
                  </button>
          </div>
          <div className='w-1/3'>
            <h1 className='font-bold'>Payment status</h1>
          {orderDetails?.order?.modeofPayment === 'razorpay' ? (
            <div>
              <h1 className='text-green-500 font-bold'>Payment done already</h1>
            </div>
          ) : (
            <div>
              <h1>Please pay {orderDetails?.order?.cartTotal?.totalamt} on delivery</h1>
            </div>
          )}
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
  )
}

export default OrderSingle;