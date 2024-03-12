import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const isAdmin = () => user.role === "admin";
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [timeRange, setTimeRange] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const deliveryStatusOptions = ["all","placed", "shipped", "out for delivery", "delivered"];
  const timeRangeOptions = ["30 days", "1 year"];


  const handleTimeRangeCheckboxChange = (range) => {
    const updatedTimeRange = timeRange.includes(range)
      ? timeRange.filter((selectedRange) => selectedRange !== range)
      : [...timeRange, range];
    setTimeRange(updatedTimeRange);
  };
  const handleDeliveryStatusFilter = (status) => {
    setSelectedStatus(status);
    const filteredOrders = status === "all"
      ? orders
      : orders.filter((order) => order.deliveryStatus === status);
    setOrders(filteredOrders);
  };

  const handleApplyFilters = () => {
    const filteredOrders = orders
      .filter((order) => timeRange.length === 0 || timeRange.includes(order.timeRange))
      .filter((order) => selectedStatus === "all" || order.deliveryStatus === selectedStatus);
    setOrders(filteredOrders);
  };


  const handleSearch = () => {
    const filteredOrders = orders.filter((order) =>
      order.cartItems.some((cartItem) =>
        cartItem.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setOrders(filteredOrders);
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/order/getOrders"
      );
      const data = await response.json();
console.log(data);
      if (response.ok) {
        if (Array.isArray(data.orders)) {
          
          if(isAdmin()){
            setOrders(data.orders);
          }
          else{
            const filteredOrders = data.orders.filter(
                (order) => order.userInfo.name === user.name
              );
            setOrders(filteredOrders);
            console.log(filteredOrders);
          }
          
         
          
        } else {
          console.error(
            "Error fetching orders: Response is not an array:",
            data
          );
        }
      } else {
        console.error(
          "Error fetching orders:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
   
    fetchOrders();
  
   
  }, [user]);

  
  const updateOrderStatus = async (orderId) => {
    try {
      if (!orderId) {
        console.error("Error updating order status: orderId is undefined");
        return;
      }
      const response = await fetch(
        `http://localhost:8080/api/v1/order/updateOrder/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deliveryStatus: selectedStatus }),
        }
      );

      if (response.ok) {
        fetchOrders();
      } else {
        console.error(
          "Error updating order status:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
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
        case "cancelled":
          return <h1 className="text-red-500">Cancelled</h1>
      default:
        return null;
    }
};

  return (
    <div className="flex flex-row bg-gray-100">
      <div className="w-1/4 bg-white m-3 ml-10 pl-15 p-2">
        <h1 className="font-bold text-lg">Filters</h1>
        <div>
          <h2 className="font-semibold">Delivery Status</h2>
          {deliveryStatusOptions.map((status) => (
            <div key={status}>
              <input
                type="radio"
                id={`statusRadio_${status}`}
                checked={selectedStatus === status}
                onChange={() => handleDeliveryStatusFilter(status)}
              />
              <label htmlFor={`statusRadio_${status}`}>{status}</label>
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-semibold">Time Range</h2>
          {timeRangeOptions.map((range) => (
            <div key={range}>
              <input
                type="checkbox"
                id={`timeRangeCheckbox_${range}`}
                checked={timeRange.includes(range)}
                onChange={() => handleTimeRangeCheckboxChange(range)}
              />
              <label htmlFor={`timeRangeCheckbox_${range}`}>{range}</label>
            </div>
          ))}
        </div>
        <button onClick={handleApplyFilters} className="bg-blue-500 text-white p-2  mt-2">Apply Filters</button>
      </div>
      
      <div className="flex flex-col w-3/4">
        <div className="w-3/4 bg-white p-1 mt-2 rounded-lg ml-2">
       
        <input
          type="text"
          placeholder="Search your orders here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-3/4 focus:border-black focus:border-2 rounded-lg p-2"
        />
        <button className="w-1/4 bg-blue-500 p-2 text-white font-semibold rounded-lg" onClick={handleSearch}>Search orders</button>
        </div>
        <div>
          {orders
           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((order) => (
            <div key={order._id}  className="flex flex-col">
              <Link to={`/order/${order._id}`} className="flex bg-white border-2 hover:shadow-slate-500 hover:shadow-2xl cursor-pointer w-3/4 m-2 flex-row align-middle ">
                <div className="flex flex-col w-1/2">
                  {order.cartItems.map((cartItem) => (
                    <div key={cartItem._id}>
                      <div className="flex flex-row gap-7 p-2 w-full ">
                        <img
                          src={cartItem.image}
                          alt=""
                          className="w-24 h-20"
                        />
                        <h1>{cartItem.name}</h1>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col ml-20 mt-4">
                  <h1 className="font-bold text-xl font-mono"><FontAwesomeIcon icon={faIndianRupeeSign}/>{order.cartTotal.totalamt}</h1>
                </div>
                <div className="ml-24 flex flex-col mt-4">
                <h1>Placed on {new Date(order?.updatedAt).toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' })}</h1>
<h1 className="font-bold text-lg">{handleColor(order.deliveryStatus)}</h1>
<h1 className="text-blue-500 mt-2"><FontAwesomeIcon icon={faStar}/> Rate your Product</h1>
                </div>
              </Link>
            
              {isAdmin() && (order.deliveryStatus!=="cancelled") && (
                  
                <div>
                  <label htmlFor="statusSelect">Update Status:</label>
                  <select
                    id="statusSelect"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="shipped">Shipped</option>
                    <option value="out for delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  <button onClick={() => updateOrderStatus(order._id)}>
                    Update Status
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
