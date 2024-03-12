import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart,faIndianRupeeSign,faChevronUp,faChevronDown } from '@fortawesome/free-solid-svg-icons';
import flip from "../../Assets/flip.png";
import { UserContext } from '../../UserContext';
import { WishlistContext } from '../Wishlist/WishlistProvider';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import logo from '../../Assets/fkheaderlogo_plus-055f80.svg';
import ReactImageMagnify from 'react-image-magnify';

const ProductDisplay = () => {
  const { user } = useContext(UserContext);
  const { mainCategory, subCategory } = useParams();
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('lowToHigh');
  const { addToWishlist, removeFromWishlist, isProductInWishlist } = useContext(WishlistContext);
  const [filterOptions, setFilterOptions] = useState({
    price: { min: '0', max: '10000' },
    brand: [],
    color: '',
    rating:0,
    gender: [],
    productType: [],
  });
  const [loading, setLoading] = useState(true);
  const brandMapping = {
    Electronics: ['ASUS', 'Lenovo', 'Sony','Canon','Egate','Samsung'],
    Fashion: ['Nike', 'Adidas', 'Puma'],
   Beauty:['Trimax','Zara','Nyaka']
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); 

  const [brandSearch, setBrandSearch] = useState('');
const [showBrand,setshowBrand]=useState(false);
const [showRatings,setshowRatings]=useState(false);
const [showGender,setshowGender]=useState(false);
const [showType,setshowColor]=useState(false);
const[showupArrowBrand,setShowupArrowBrand]=useState(false);
const[showupArrowRating,setShowupArrowRating]=useState(false);
const[showupArrowGender,setShowupArrowGender]=useState(false);
const[showupArrowType,setShowupArrowType]=useState(false);




const clicktoShowBrand=()=>{
  setshowBrand(!showBrand);
  
  setShowupArrowBrand(!showupArrowBrand);
}
const clicktoShowRatings=()=>{
  setshowRatings(!showRatings);
  
  setShowupArrowRating(!showupArrowRating);
}
const clicktoShowGender=()=>{
  setshowGender(!showGender);
  
  setShowupArrowGender(!showupArrowGender);
}
const clicktoShowType=()=>{
  setshowColor(!showType);
  
  setShowupArrowType(!showupArrowType);
}
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://flipkartclone2-o8uw.onrender.com/api/v1/products/getAllProducts');
        const data = await response.json();
        console.log('Response from backend:', data);

        const productsData = data.data || data.products;

        const filteredProducts = productsData.filter(product => {
          return (
            product.mainCategory === mainCategory
          );
        });

        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [mainCategory, subCategory]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, value,type,checked } = event.target;

    if (name === 'priceMin' || name === 'priceMax') {
      setFilterOptions((prevOptions) => ({
        ...prevOptions,
        price: {
          ...prevOptions.price,
          [name]: value,
        },
      }));
    } else if (name === 'brand') {
      const selectedBrand = value;
      setFilterOptions((prevOptions) => {
        const updatedBrands = [...prevOptions.brand];

        if (updatedBrands.includes(selectedBrand)) {
          const index = updatedBrands.indexOf(selectedBrand);
          updatedBrands.splice(index, 1);
        } else {
          updatedBrands.push(selectedBrand);
        }

        return {
          ...prevOptions,
          brand: updatedBrands,
        };
      });
    }
    else if (name === 'rating') {
      const selectedRating = value;
      setFilterOptions((prevOptions) => ({
          ...prevOptions,
          rating: prevOptions.rating === selectedRating ? 0 : selectedRating,
      })); 
    }
    else {
      setFilterOptions((prevOptions) => ({
        ...prevOptions,
        [name]: value,
      }));
    }
    if (name === 'brandSearch') {
      setBrandSearch(value);
    }
    if (name === 'gender' || name === 'productType') {
      setFilterOptions((prevOptions) => {
        const updatedValues = [...prevOptions[name]];
  
        if (checked) {
          updatedValues.push(value);
        } else {
          const index = updatedValues.indexOf(value);
          if (index !== -1) {
            updatedValues.splice(index, 1);
          }
        }
  
        return {
          ...prevOptions,
          [name]: updatedValues,
        };
      });
    }
  };

  const handleSliderChange = (value) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      price: {
        min: value[0],
        max: value[1],
      },
    }));
  };

  const sortedAndFilteredProducts = (products ?? []).filter((product) => {
    const { price, brand, color,rating,gender,productType } = filterOptions;
    const productNameWords = product.name.toLowerCase().split(' ');
    const productNameContainsGender = gender.some(g => productNameWords.includes(g.toLowerCase()));
    const productNameContainsProductType = productType.some(pt => productNameWords.includes(pt.toLowerCase()));
    return (
      (price.min === '' || product.price >= parseInt(price.min)) &&
      (price.max === '' || product.price <= parseInt(price.max)) &&
      (brand.length === 0 || brand.includes(product.brand)) &&
      (color === '' || product.color.toLowerCase().includes(color.toLowerCase()))&&
      (rating === 0 || product.rating >= rating) &&
      (mainCategory !== 'Fashion' || (gender.length === 0 || productNameContainsGender)) &&
      (mainCategory !== 'Fashion' || (productType.length === 0 || productNameContainsProductType)) &&
      (brandSearch === '' || product.brand.toLowerCase().includes(brandSearch.toLowerCase()))
    );
  })
    .sort((a, b) => {
      if (sortOption === 'lowToHigh') {
        return a.price - b.price;
      } else if (sortOption === 'highToLow') {
        return b.price - a.price;
      }
      return 0;
    });

  const handleWishlistAction = (productId, productDetails) => {
    if (isProductInWishlist(productId, productDetails)) {
      removeFromWishlist(productId);
      console.log(`Removed product with ID ${productId} from wishlist`);
    } else {
      addToWishlist(productId, productDetails);
      console.log(`Added product with ID ${productId} to wishlist`);
    }
  };
  const calculateDelivery = (price) => {
    const deliveryInfo = {
      charge: price > 1000 ? 'Free' : '40',
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    };

    return deliveryInfo;
  };
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedAndFilteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className='mx-auto mt-8 bg-gray-100 p-2 flex'>
      <div className="md:w-1/6 w-1/3 border-2 ml-1 bg-white mr-3 h-fit p-3">
        <img src={logo} alt="" />
        <h2 className="text-xl font-bold mb-4">Filters </h2>

        <div className="mb-4">
          <label htmlFor='sortOption' className='font-semibold'>Sort by: </label>
          <select id='sortOption' name='sortOption' onChange={handleSortChange} value={sortOption}>
            <option value='lowToHigh'>Low to High Price</option>
            <option value='highToLow'>High to Low Price</option>
          </select>
        </div>

        <div className="mb-4">Filter by
          <label className='font-semibold'> Price :</label>
          <div className="flex items-center">
            <span className="mr-2"><FontAwesomeIcon icon={faIndianRupeeSign} className='mt-1'/> {filterOptions.price.min}</span>
            <Slider
              range
              min={0}
              max={100000}
              onChange={handleSliderChange}
              value={[filterOptions.price.min, filterOptions.price.max]}
              style={{ width: '128px' }}
            />
            <span className="ml-2"><FontAwesomeIcon icon={faIndianRupeeSign} className='mt-1'/> {filterOptions.price.max}</span>
          </div>
        </div>

        <div className="mb-4 w-full border-t-2 border-b-2 py-2">
          <label className='font-semibold' onClick={clicktoShowBrand}>Brand
          {showupArrowBrand ? (
      <FontAwesomeIcon icon={faChevronUp} className='lg:ml-28 ml-12'/>
    ) : (
      <FontAwesomeIcon icon={faChevronDown} className='lg:ml-28 ml-12'/>
    )}
    
          </label>
          {showBrand && (
            <div>

 <input
 type='text'
 id='brandSearch'
 name='brandSearch'
 placeholder='Search brand'
 className='outline-none border-b-2 pb-1'
 onChange={handleFilterChange}
 value={brandSearch}
/>
       <div className='flex flex-col'>
   
         {brandMapping[mainCategory]?.map((brand) => (
                 
           <label key={brand}>
             
             <input
               type='checkbox'
               name='brand'
               value={brand}
               checked={filterOptions.brand.includes(brand)}
               onChange={handleFilterChange}
             />
             {brand}
             
           </label>
         ))}
       </div>
    </div>
          )}
          
          </div>

        <div className="mb-4 border-b-2 pb-2">
    <label className='font-semibold' onClick={clicktoShowRatings}> Rating
    {showupArrowRating ? (
      <FontAwesomeIcon icon={faChevronUp} className='lg:ml-28 ml-12'/>
    ) : (
      <FontAwesomeIcon icon={faChevronDown} className='lg:ml-28 ml-12'/>
    )}
    
         

    </label>
    {showRatings && (
      <div className='flex flex-col'>
        <label>
            <input
                type='checkbox'
                name='rating'
                value={2}
                checked={filterOptions.rating === '2'}
                onChange={handleFilterChange}
            />
            2 Stars or more
        </label>
        <label>
            <input
                type='checkbox'
                name='rating'
                value={3}
                checked={filterOptions.rating === '3'}
                onChange={handleFilterChange}
            />
            3 Stars or more
        </label>
        <label>
            <input
                type='checkbox'
                name='rating'
                value={4}
                checked={filterOptions.rating === '4'}
                onChange={handleFilterChange}
            />
            4 Stars or more
        </label>
    </div>
    )}
    
</div>
{mainCategory==='Fashion' && (
  <>
  <div className="mb-4 w-full border-b-2 pb-2">
  <label htmlFor="genderFilter" className='font-semibold' onClick={clicktoShowGender}>Gender
  {showupArrowGender ? (
      <FontAwesomeIcon icon={faChevronUp} className='lg:ml-24 ml-12'/>
    ) : (
      <FontAwesomeIcon icon={faChevronDown} className='lg:ml-24 ml-12'/>
    )}
  </label>
  {showGender && (
 <div className='flex flex-col'>
 <label>
   <input
     type="checkbox"
     name="gender"
     value="men"
     checked={filterOptions.gender.includes('men')}
     onChange={handleFilterChange}
   />
   Male
 </label>
 <label>
   <input
     type="checkbox"
     name="gender"
     value="women"
     checked={filterOptions.gender.includes('women')}
     onChange={handleFilterChange}
   />
   Female
 </label>
 <label>
   <input
     type="checkbox"
     name="gender"
     value="kids"
     checked={filterOptions.gender.includes('kids')}
     onChange={handleFilterChange}
   />
   Kids
 </label>
</div>
  )}
 
</div>


<div className="mb-4 border-b-2 pb-2">
  <label htmlFor="productTypeFilter" className='font-semibold' onClick={clicktoShowType}>Type
  {showupArrowType ? (
      <FontAwesomeIcon icon={faChevronUp} className='lg:ml-28 ml-12'/>
    ) : (
      <FontAwesomeIcon icon={faChevronDown} className='lg:ml-28 ml-12'/>
    )}
     
  </label>
  {showType && (
    <div className='flex flex-col'>
    {['Jeans', 'Shirt', 'Top', 'T-shirt','Saree'].map((type) => (
      <label key={type}>
        <input
          type="checkbox"
          name="productType"
          value={type}
          checked={filterOptions.productType.includes(type)}
          onChange={handleFilterChange}
        />
        {type}
      </label>
    ))}
  </div>
  )}
  </div>
</>
)}
 
       
  <div className="mb-4">
          <label htmlFor='colorFilter'>Filter by Color: </label>
          <input
            type='text'
            id='colorFilter'
            name='color'
            placeholder='Enter color'
            onChange={handleFilterChange}
            value={filterOptions.color}
          />
        </div>
      </div>

      <div className="lg:w-5/6 md:w-5/6 w-2/3 p-4 bg-white">
        <div  className={`${
              mainCategory === 'Appliances' || mainCategory === 'Electronics' || mainCategory === 'Mobiles'
                ? ' flex flex-col'
                : ' flex flex-row flex-wrap'
            } `}>
          {currentProducts.map((product) => (
            <Link to={`/product/${product.name}`}  key={product._id}  className={`cursor-pointer ${
              mainCategory === 'Appliances' || mainCategory === 'Electronics' || mainCategory === 'Mobiles'
                ? ' flex md:flex-row flex-col  w-5/6 justify-between mx-auto'
                : ' flex flex-col w-full mx-auto lg:w-1/3 md:w-1/2 xl:w-1/4 flex-wrap'
            } bg-white p-3 `} >
              <div className='min-w-48 max-w-64 max-h-64 min-h-48 p-5'>
                <Carousel stopOnHover infiniteLoop autoPlay showThumbs={false} interval={2000}>
                  {product.images.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt={`Product ${index}`} className='w-56 h-56' />
                    </div>
                  ))}
                </Carousel>
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() => handleWishlistAction(product._id, product)}
                  className={`relative bottom-60 left-52 text-2xl cursor-pointer ${isProductInWishlist(product._id, product) ? 'text-red-500' : ''}`}
                />
              </div>
              <div className='flex flex-col w-3/4'>
                <p className='font-semibold text-gray-400'>{product.brand}</p>
                <p className='font-semibold text-base hover:text-blue-500 w-full'>{product.name}</p>
                <p className='font-semibold'>
                  <FontAwesomeIcon icon={faStar} className='text-yellow-500' /> {product.rating}
                </p>
                {/* <p className='text-gray-600'>{product.description}</p> */}
                {(product.mainCategory!=="Fashion" &&  product.mainCategory!=="Grocery") && (
                  <ul className='list-disc hidden lg:flex lg:flex-col pl-6'>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                )}
                {/* <ul className='list-disc pl-6'>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul> */}
              </div>
              <div className='flex flex-col'>
                <p className='font-bold flex text-2xl'><FontAwesomeIcon icon={faIndianRupeeSign} className='mt-1'/>{product.price} <img src={flip} alt="" className='w-18 h-6 mt-1 ml-5' /></p>
                <p className='text-gray-500 text-md line-through'><FontAwesomeIcon icon={faIndianRupeeSign}/>{product.mrp}</p>
                <p className='text-md'>{`Delivery: ${calculateDelivery(product.price).charge}`}</p>
                <p className='text-md'> Est. Delivery Date: {calculateDelivery(product.price).date.toDateString()}</p>
                <p className='text-green-500 font-bold'>Bank Offers Available</p>
                {/* <button onClick={() => addToWishlist(product._id)} className='text-blue-500 underline cursor-pointer'>Add to Wishlist</button> */}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(sortedAndFilteredProducts.length / itemsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-2 p-2 border ${currentPage === i + 1 ? 'bg-blue-500 text-white px-3' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;

