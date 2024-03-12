
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faCamera, faStar as filledStar } from '@fortawesome/free-solid-svg-icons';
Modal.setAppElement('#root'); 
const AddReview = ({ productName, userName }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const inputRef = useRef(null);
  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages([...images, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidUser = await checkValidUser();

    if (!isValidUser) {
      toast.info('Please purchase product to add a review');
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('rating', rating);

    images.forEach((image, index) => {
      formData.append(`image-${index}`, image);
    });

    formData.append('userName', userName);
    formData.append('productName', productName);

    try {
      await axios.post('https://flipkartclone2-o8uw.onrender.com/api/v1/review/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Review added successfully');
      handleCloseModal();
    } catch (error) {
      console.error('Error adding review:', error.message);
    }
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    
    setTitle('');
    setDescription('');
    setRating(0);
    setImages([]);
  };
  const customModalStyles = {
    content: {
      width: '1200px', 
      height: '550px',
      margin: '95px 105px',
    },
  };
  const checkValidUser = async () => {
    try {
      const response = await fetch('https://flipkartclone2-o8uw.onrender.com/api/v1/order/getOrders');
      if (!response.ok) {
        throw new Error(`Failed to fetch orders. Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      const orders = responseData; 

      const isValidUser = orders.orders.some(order => {
        // console.log("username is ",order.userInfo.name);
        // console.log("product name is",order.cartItems.some(item=>item.name));
        // console.log("actual product name is",productName);
        return order.userInfo.name === userName && order.cartItems.some(item=>item.name===productName);
      });
  
      return isValidUser;
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      return false;
    }
  };
  
  
  return (
    <div>
      <button onClick={handleOpenModal}>Add Review</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Add Review Modal"
        style={customModalStyles}
      >
        <div className='flex flex-row justify-between'>
        <h2 className='text-xl font-bold w-fit'>Ratings and Reviews</h2>
        <h1 className='mt-1'>{productName}</h1>
        </div>
   
        <span className="close relative -top-12 left-full text-2xl font-bold text-red-500" onClick={handleCloseModal}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className='flex flex-col'>
        <label className='font-bold text-xl flex flex-row gap-4 mb-4'>
         Rate your product  
     {[...Array(5)].map((_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={index + 1 <= rating ? filledStar : emptyStar}
      onClick={() => setRating(index + 1)}
      className='font-semibold cursor-pointer text-yellow-500 text-2xl'
    />
  ))}
</label>
          <h1 className='text-xl font-bold mb-4'>Review Your product</h1>
          <label className='flex flex-col '>
            <h1 className='text-xl font-normal'>Title</h1>
            <input type="text"  value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title of your review ....' className='font-semibold border-2 w-full p-2 justify-top'/>
          </label>
          <br />
          <label className=' flex flex-col'>
            <h1 className='font-bold text-xl'>Description</h1>
            <textarea type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Add description for your product ..' rows={4} cols={14} className='font-semibold border-2 w-full'/>
          </label>
          <br />

          <label className='font-bold text-xl relative'>
  <h1>
    <FontAwesomeIcon icon={faCamera} onClick={() => inputRef.current.click()} className='cursor-pointer text-blue-500' />
  </h1>
  <input
    type="file"
    accept="image/*"
    multiple
    onChange={handleImageChange}
    className='hidden'
    ref={inputRef}
  />
</label>
          <br />
          <button type="submit" className='w-64 mx-auto text-white border-2 text-xl bg-orange-500 font-bold p-2'>Add Review</button>
        </form>
      </Modal>
    </div>
  );
};

export default AddReview;