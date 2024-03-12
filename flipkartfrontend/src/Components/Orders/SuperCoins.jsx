import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SuperCo from './SuperCo';

const SuperCoins = () => {
  const { user, setUser } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
          const response = await fetch(
            "https://flipkartclone2-o8uw.onrender.com/api/v1/order/getOrders"
          );
          const data = await response.json();
    console.log(data);
          if (response.ok) {
            if (Array.isArray(data.orders)) {
                  const filteredOrders = data.orders.filter(
                    (order) => order.userInfo.name === user.name
                  );
                setOrders(filteredOrders.reverse());
                console.log(filteredOrders);
 
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
    
      const totalCoins=()=>{
        let totalearned=0;
        orders.forEach((order)=>{
            if(order?.supercoinsEarned){
                totalearned+=order?.supercoinsEarned;
            }
        });
        return totalearned;
      }
  return (
    <div className='bg-gray-200 m-2 p-2'>
        <div className='w-3/4 mx-auto mt-3 mb-3 bg-white p-2 '>
            <h1 className='font-bold text-2xl border-b-2 pb-2 pl-4'>Supercoins Balance <FontAwesomeIcon icon={faCoins} className='text-yellow-500 mr-2'/>{(totalCoins()).toFixed(0)}</h1>
            <div className='m-4'>
            <Link to='/superhist' className='p-3 bg-gray-100 w-fit mt-4'>See your supercoins history</Link>
          </div>
          
          </div>
          
    </div>
  )
}

export default SuperCoins