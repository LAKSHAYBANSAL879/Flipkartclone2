import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faCircleCheck,faPenToSquare,faTrash} from '@fortawesome/free-solid-svg-icons';
const Reviews = ({ productName, userName }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://flipkartclone2-o8uw.onrender.com/api/v1/review/all/${productName}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
      }
    };

    fetchReviews();
  }, [productName]);

  const canModifyReview = (reviewUserName) => {
    return userName === reviewUserName;
  };

  const handleUpdateReview = async (id) => {
    try {
     
      const existingReviewsResponse = await axios.get(`https://flipkartclone2-o8uw.onrender.com/api/v1/review/all/${productName}`);
      const existingReviews = existingReviewsResponse.data;
  
      
      const existingReview = existingReviews.find((review) => review._id === id);
  
    
      const updatedTitle = prompt('Enter updated title:', existingReview.title);
      const updatedDescription = prompt('Enter updated description:', existingReview.description);
      const updatedRating = prompt('Enter updated rating:', existingReview.rating);
  
     
      const response = await axios.put(`https://flipkartclone2-o8uw.onrender.com/api/v1/review/update/${id}`, {
        title: updatedTitle || existingReview.title,
        description: updatedDescription || existingReview.description,
        rating: updatedRating || existingReview.rating,
        productName:existingReview.productName,
        userName:existingReview.userName,
       image:existingReview.image
      });
  
     
      if (response.status === 200) {
       
        const updatedResponse = await axios.get(`https://flipkartclone2-o8uw.onrender.com/api/v1/review/all/${productName}`);
        
       
        setReviews(updatedResponse.data);
  
  
        console.log('Review updated successfully');
      } else {
        console.error('Failed to update review');
      }
    } catch (error) {
      console.error('Error updating review:', error.message);
    }
  };
  const handleDeleteReview = async (id) => {
    try {
     
      const confirmation = window.confirm('Are you sure you want to delete this review?');

      if (!confirmation) {
        return;
      }

      const reviewToDelete = reviews.find((review) => review._id === id);

      if (canModifyReview(reviewToDelete.userName)) {
      
        await axios.delete(`https://flipkartclone2-o8uw.onrender.com/api/v1/review/delete/${id}`);
        alert('Review deleted successfully');
        const updatedReviews = reviews.filter((review) => review._id !== id);
        setReviews(updatedReviews);
      } else {
        alert('You do not have permission to delete this review');
      }
    } catch (error) {
      console.error('Error deleting review:', error.message);
    }
  };


  const promptReviewUpdate = (existingReview) => {
    const updatedTitle = prompt('Enter updated title:', existingReview.title);
    const updatedDescription = prompt('Enter updated description:', existingReview.description);
    const updatedRating = prompt('Enter updated rating:', existingReview.rating);

    return {
      title: updatedTitle || existingReview.title,
      description: updatedDescription || existingReview.description,
      rating: updatedRating || existingReview.rating,
    };
  };

  return (
    <div>
      <h2 className='font-bold text-lg ml-1'>All Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <div key={review._id} className='border-2 p-2 flex flex-col mt-2'>
            <div className='flex flex-row gap-3'>
            <p className='bg-green-600 text-white px-1 text-sm'><FontAwesomeIcon icon={faStar} className='mr-1'/>{review.rating}</p>
            <h3 className='font-bold'>{review.title}</h3>
            </div>
           
            <p className='mt-2'>{review.description}</p>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              {review.image && review.image.map((image, index) => (
                <img
                  key={index}
                  src={`https://flipkartclone2-o8uw.onrender.com/api/v1/review/uploads/${image}`}
                  alt={review.title}
                  style={{ maxWidth: '100px', margin: '5px' }}
                />
              ))}
            </div>
            {/* <img src={`https://flipkartclone2-o8uw.onrender.com/api/v1/review/uploads/${review.image}`} alt={review.title} style={{ maxWidth: '200px' }} /> */}
          <h1 className='font-bold text-gray-400 flex gap-3 ml-2'>{review.userName}<FontAwesomeIcon icon={faCircleCheck} className='mt-1'/>Flipkart Certified Buyer</h1>
            {canModifyReview(review.userName) && (
              <div className='flex flex-row ml-2 justify-between'>
                <button onClick={() => handleUpdateReview(review._id)}><FontAwesomeIcon icon={faPenToSquare} className='text-xl font-bold'/></button>
                <button onClick={() => handleDeleteReview(review._id)}><FontAwesomeIcon icon={faTrash} className='text-xl font-bold'/></button>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
