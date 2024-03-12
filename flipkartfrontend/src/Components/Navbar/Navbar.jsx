import React, { useContext, useEffect, useState } from 'react';
import logo from '../../Assets/fkheaderlogo_plus-055f80.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faSearch, faUserCircle, faCoins, faStore, faBoxArchive, faCube, faHeart, faBell, faTag, faCreditCard, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Cookies from 'js-cookie';
import { useCart } from '../../CartContext';

export const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [showLinks, setShowLinks] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const history = useNavigate();
  const { getTotalItems } = useCart();

  const handleToggle = () => {
    setShowLinks(!showLinks);
  };

  const handleAccountHover = () => {
    setShowAccountDropdown(true);
  };

  const handleAccountLeave = () => {
    setShowAccountDropdown(false);
  };

  const handleSearchHover = () => {
    setShowSearchDropdown(true);
  };

  const handleSearchLeave = () => {
    setShowSearchDropdown(false);
  };

  const handleLogout = () => {
    setUser(null);
    Cookies.remove('token');
    history('/signin');
  };

  const handleCartClick = () => {
    if (user) {
      history('/cart');
    } else {
      history('/signin');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://flipkartclone2-o8uw.onrender.com/api/v1/products/getAllProducts`);
      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`);
      }
      const data = await response.json();
      const productsData = data.data || data.products;
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  const handleSearch = () => {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredProducts);
    if (searchTerm.trim() !== "") {
      setRecentSearches(prevSearches => {
        const updatedSearches = [searchTerm, ...prevSearches.filter(term => term !== searchTerm)];
        return updatedSearches.slice(0, 5);
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, products]);

  return (
    <div className='bg-white shadow-md sticky top-0 w-full z-10'>
      <div className='container mx-auto p-4 flex items-center '>

        <Link to='/' className='flex items-center'>
          <img src={logo} alt='flipkart.com' className='w-48 h-auto' />
        </Link>

        <div className='relative flex rounded-xl bg-gray-50 items-center w-1/2  ml-4 mr-4' onMouseEnter={handleSearchHover} onMouseLeave={handleSearchLeave}>
          <button className='bg-gray-100 p-2 rounded-xl'>
            <FontAwesomeIcon icon={faSearch} className='text-gray-600 cursor-pointer' />
          </button>
          <input
            type='text'
            placeholder='Search for Products, Brands and More'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='hidden md:block bg-gray-100 w-full p-2 pl-4 rounded-xl border-none outline-none'
          />
        </div>
        {searchResults.length > 0 && showSearchDropdown && (
  <div className='absolute bg-white border font-light text-sm flex flex-col top-14 w-fit h-32 overflow-y-scroll left-64 z-50 border-gray-300 rounded p-2 hover:text-black transition-all duration-300 shadow-md' onMouseEnter={handleSearchHover} onMouseLeave={handleSearchLeave}>
    {recentSearches.length > 0 && (
      <div className='font-bold mb-2'>Recent Searches:</div>
    )}
    {recentSearches.map((recentTerm, index) => (
      <div key={index} className='flex items-center p-2 hover:bg-gray-100 w-fit' onClick={() => setSearchTerm(recentTerm)}>
        {recentTerm}
      </div>
    ))}
    <div className='font-bold mb-2'>All Searches:</div>
    {searchResults.map(product => (
      <Link key={product.id} to={`/product/${product.name}`} className='flex items-center p-2 hover:bg-gray-100 w-fit'>
        {product.name.slice(0, 60)}
      </Link>
    ))}
  </div>
)}
        <div
          className='flex items-center p-2  text-xl text-gray-700 hover:text-blue-gray-200 hover:bg-gray-100 cursor-pointer relative'
          onMouseEnter={handleAccountHover}
          onMouseLeave={handleAccountLeave}
        >
          <FontAwesomeIcon icon={faUserCircle} className='mr-2 text-black text-md ' />
          <h1>Account</h1>
          {showAccountDropdown && (
            <div className='absolute bg-white border font-light text-sm flex flex-col top-10 -right-16 w-48 z-50 border-gray-300 rounded p-2 hover:text-black transition-all duration-300 shadow-md'>
              <Link to='/profile' className='flex items-center p-2 hover:bg-gray-100 w-full'>
                <FontAwesomeIcon icon={faUserCircle} className='mr-3 text-gray-700' />
                My Profile
              </Link>
              <Link to='/supercoins' className='flex items-center p-2 hover:bg-gray-100 w-full'>
                <FontAwesomeIcon icon={faCoins} className='mr-3 text-gray-700' />
                SuperCoins
              </Link>
              <Link to='/flipkartplusZone' className='flex items-center p-2 hover:bg-gray-100 w-full'>
                <FontAwesomeIcon icon={faBoxArchive} className='mr-3 text-gray-700' />
                Flipkart Plus
              </Link>
              <Link to='/orders' className='flex items-center p-2 hover:bg-gray-100 w-full'>
                <FontAwesomeIcon icon={faCube} className='mr-3 text-gray-700' />
                Orders
              </Link>
              <Link to='/wishlist' className='flex items-center p-2 hover:bg-gray-100 w-full'>
                <FontAwesomeIcon icon={faHeart} className='mr-3 text-gray-700' />
                Wishlist
              </Link>
              <Link to='/cupons' className='flex items-center p-2 hover:bg-gray-100 w-full'>
                <FontAwesomeIcon icon={faTag} className='mr-3 text-gray-700' />
                Coupons
              </Link>
              <Link to='/GiftCard' className='flex items-center p-2 hover:bg-gray-100 w-full'>
                <FontAwesomeIcon icon={faCreditCard} className='mr-3 text-gray-700' />
                GiftCard
              </Link>
              <Link to='/notifications' className='flex items-center p-2 hover:bg-gray-100 w-full'>
                <FontAwesomeIcon icon={faBell} className='mr-3 text-gray-700' />
                Notifications
              </Link>
              <button className='flex items-center p-2 hover:bg-gray-100 w-full' onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} className='mr-3 text-gray-700' />
                Logout
              </button>
            </div>
          )}
        </div>

        <div className='flex items-center p-2 font-bold text-sm text-gray-700 ml-2' onClick={handleCartClick}>

          <FontAwesomeIcon icon={faCartShopping} className='text-2xl' />

          <div className='text-xl relative -top-3 text-white bg-red-500  rounded-full font-bold h-fit w-fit px-2 '>
            <h1>{getTotalItems()}</h1>
          </div>
        </div>

        <div className='ml-6 flex'>
          <Link to='/addProduct' className='flex'><FontAwesomeIcon icon={faStore} className='mt-1 mr-3' /><h1>Become a seller</h1></Link>
        </div>

        <div className={` cursor-pointer ml-2  rounded-full p-2  ${showLinks ? 'hidden' : ''}`}>
          <Link to={user ? '/profile' : '/signin'} className=' gap-2 text-white'>
            {!!user &&
             <div className=''><img  src={`https://flipkartclone2-o8uw.onrender.com/api/v1/auth/uploadss/${user.profileImageUrl}`} className="block mx-auto mt-2 rounded-full h-16 w-16 object-cover" alt="" /></div>
            
            }
          </Link>
        </div>

        {/* <div className='md:hidden'>
          <FontAwesomeIcon icon={faBars} className='text-3xl text-gray-700 cursor-pointer' onClick={handleToggle} />
        </div> */}
      </div>
    </div>
  );
};
