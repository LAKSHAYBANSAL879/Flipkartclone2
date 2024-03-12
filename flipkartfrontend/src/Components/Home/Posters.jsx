import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link,BrowserRouter, useNavigate } from 'react-router-dom';

const Posters = () => {
  const images = [
    'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/60f9be2fdfd66858.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/acaba2fc1e8541ec.jpeg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/f9ed97142ac6521a.jpeg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/36edcda6bdf9ca8a.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/7fd0e4ab26429926.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/ca2843e62171405e.jpg?q=20',
  ];
  const links = [
    '/Mobiles',
    '/Electronics/Laptop',
    '/Electronics/Laptop',
    '/Electronics/Printer',
    '/Travel',
    '/Travel',
  ];
const navigate=useNavigate();
const handleClickItem=(index)=>{
    const link=links[index];
    navigate(link);
}
  return (
    <div className='m-3'>
      <Carousel stopOnHover infiniteLoop autoPlay showThumbs={false} interval={2000} onClickItem={(index)=>handleClickItem(index)}>
        {images.map((image, index) => (
          <div key={index} className='cursor-pointer'>
          
              <img src={image} alt={`Poster ${index + 1}`} />
           
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Posters;

