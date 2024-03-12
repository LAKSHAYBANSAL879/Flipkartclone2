import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AddReview from "./AddReview";
import flip from "../../Assets/flip.png";

import Reviews from "./Reviews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faIndianRupeeSign,
  faTicket,
  faTag,
  faLocationDot,faCartShopping,faBolt
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/fkheaderlogo_plus-055f80.svg";
import { WishlistContext } from "../Wishlist/WishlistProvider";
import { UserContext } from "../../UserContext";
import promo from "../../Assets/promo.avif";
import SimilarProducts from "./SimilarProducts";
import { useCart } from "../../CartContext";
import AddQuestionForm from "./AddQuestion";
import QuestionList from "./QuestionList";
import ReactImageMagnify from "react-image-magnify";
const ProductSingle = () => {
  const { name } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [pincode, setPincode] = useState("");
  const [isPincodeValid, setIsPincodeValid] = useState(true);

  const [message, setMessage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { addToWishlist, removeFromWishlist, isProductInWishlist } =
    useContext(WishlistContext);
  const decodedName = decodeURIComponent(name.replace(/\%20/g, " "));
  const productName = decodedName;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(productDetails.data._id, {
      name: productDetails.data.name,
      price: productDetails.data.price,
      image:productDetails.data.images[0],
      mrp:productDetails.data.mrp,
      
    },
    selectedSize
    );
  };
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/products/getProduct/${decodedName}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch product details. Status: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("Product Details:", data);

        setProductDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [name]);

  console.log("Product Details State:", productDetails);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!productDetails) {
    return <div>Error fetching product details</div>;
  }

  const handleImageClick = (index) => {
    setSelectedImage(productDetails.data.images[index]);
  };
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
      charge: price > 1000 ? "Free" : "40",
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    };

    return deliveryInfo;
  };
  const handlePincodeChange = async (e) => {
    const newPincode = e.target.value;
    setPincode(newPincode);

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${newPincode}`
      );
      const dataPincode = await response.json();
      // console.log(dataPincode);
      if (newPincode.length !== 6) {
        setMessage("Invalid Pincode");
        setIsPincodeValid(false);
      } else {
        if (newPincode.charAt(0) === "6" || newPincode.charAt(0) === "8") {
          setMessage("Invalid not deliverable at this location");
          setIsPincodeValid(false);
        } else {
          setMessage(`Deliverable at ${dataPincode[0].PostOffice[0].District}`);
          setIsPincodeValid(true);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setMessage("Error fetching data");
      setIsPincodeValid(false);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col">
      <div className="flex md:flex-row flex-col items-center md:items-start bg-white mx-10 my-3">
        <div className="flex flex-col mt-5 md:ml-1 mx-auto w-5/6 md:w-1/3">
        <div className="w-full  border-2 p-2 h-fit flex relative flex-row">
          <div className="w-1/6 flex flex-col">
            {productDetails.data.images.map((image, index) => (
              <div
                key={index}
                className={`border-2 p-2 ${
                  selectedImage === image && "border-blue-500"
                }`}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image}
                  alt={`Product ${index}`}
                  className="w-16 h-20 cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div className="w-5/6 h-1/2 mt-2">
            {selectedImage ? (
              <div>
              
                <ReactImageMagnify className="" {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src:selectedImage
    },
    largeImage: {
        src:selectedImage,
        width: 1000,
        height: 1800
        
    },
    enlargedImageContainerDimensions: {
      width: '200%',
      height: '120%',
      border: "1px solid blue",
     
  },
  enlargedImagePosition:"beside",
  enlargedImageContainerClassName:""
}} />


                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() =>
                    handleWishlistAction(
                      productDetails.data._id,
                      productDetails.data
                    )
                  }
                  className={`absolute top-4 right-2 text-2xl cursor-pointer ${
                    isProductInWishlist(
                      productDetails.data._id,
                      productDetails.data
                    )
                      ? "text-red-500"
                      : ""
                  }`}
                />
              </div>
            ) : (
              <p>Select an image to view</p>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-center mt-2 gap-3">
          <button onClick={handleAddToCart}  className={`bg-yellow-500 text-white font-semibold rounded-md text-xl p-3 ${
    !isPincodeValid || pincode === "" ? "cursor-not-allowed opacity-50" : ""
  }`} disabled={!isPincodeValid || pincode === ""} ><FontAwesomeIcon icon={faCartShopping} className="mr-2"/>Add to cart</button>
          <Link to='/checkout' onClick={handleAddToCart}  className={`bg-orange-500 text-white font-semibold text-xl rounded-md p-3 ${
    !isPincodeValid || pincode === "" ? "cursor-not-allowed opacity-50" : ""
  }`} disabled={!isPincodeValid || pincode === ""}><FontAwesomeIcon icon={faBolt} className="mr-2"/>Buy Now</Link>
        </div>
        </div>
        <div className="w-5/6 md:w-2/3 ml-5 flex flex-col gap-3 mt-2">
          <h1 className="font-bold text-gray-500 text-lg">{productDetails.data.brand}</h1>
          <h2 className="text-xl text-gray-900 font-normal">
            {productDetails.data.name}
          </h2>
          {/* <AddReview productName={productName} userName={user.name}/>
          <Reviews productName={productName} userName={user.name}/> */}
          <div className="flex flex-row gap-5">
            <h1 className="flex bg-green-600 gap-1 text-white p-1 rounded-lg font-semibold  text-sm">
              {productDetails.data.rating}
              <FontAwesomeIcon icon={faStar} className="mt-1" />
            </h1>
            <h1 className="text-gray-400 font-semibold ml-1 text-lg">
              300 ratings and 48 reviews
            </h1>
            <img src={flip} alt="" className="w-16 h-8" />
          </div>
          <h1 className="text-green-500 text-sm font-medium">Special Price</h1>
          <div className="flex flex-row gap-3">
            <h1 className="font-bold text-3xl ">
              <FontAwesomeIcon icon={faIndianRupeeSign} />
              {productDetails.data.price}
            </h1>
            <p className="text-gray-500 text-md mt-2 line-through">
              <FontAwesomeIcon icon={faIndianRupeeSign} />
              {productDetails.data.mrp}
            </p>
            <h1 className="text-green-600 font-bold mt-1 text-xl">
              {((productDetails.data.mrp-productDetails.data.price) / (productDetails.data.mrp)*100).toFixed(0)}%
              off
            </h1>
          </div>
          {productDetails.data.mainCategory === "Fashion" &&
        productDetails.data.subCategory === "Clothing" ? (
          <div className="flex flex-row align-middle items-center gap-5">
            <h1 className="font-semibold text-gray-400">Size</h1>
            <button
        onClick={() => setSelectedSize("28")}
        className={`focus:border-blue-500 focus:text-blue-500 border-2 text-lg font-bold p-2 ${
          selectedSize === "28" && "border-blue-500 text-blue-500"
        }`}
      >
        28
      </button>
      <button
        onClick={() => setSelectedSize("30")}
        className={`focus:border-blue-500 focus:text-blue-500 border-2 text-lg font-bold p-2 ${
          selectedSize === "30" && "border-blue-500 text-blue-500"
        }`}
      >
        30
      </button>
      <button
        onClick={() => setSelectedSize("32")}
        className={`focus:border-blue-500 focus:text-blue-500 border-2 text-lg font-bold p-2 ${
          selectedSize === "32" && "border-blue-500 text-blue-500"
        }`}
      >
        32
      </button>
      <button
        onClick={() => setSelectedSize("34")}
        className={`focus:border-blue-500 focus:text-blue-500 border-2 text-lg font-bold p-2 ${
          selectedSize === "34" && "border-blue-500 text-blue-500"
        }`}
      >
        34
      </button>
      <button
        onClick={() => setSelectedSize("36")}
        className={`focus:border-blue-500 focus:text-blue-500 border-2 text-lg font-bold p-2 ${
          selectedSize === "36" && "border-blue-500 text-blue-500"
        }`}
      >
        36
      </button>
      <a className="text-blue-500" href="https://qph.cf2.quoracdn.net/main-qimg-58b524b4cf23891cbd3a17ea1be4de10">View size chart</a>
          </div>
        ) : null}

          <div>
            <h1>Cupons for you</h1>
            <h1 className="">
              <FontAwesomeIcon
                icon={faTicket}
                className="text-green-500 text-md"
              />
              <span className="font-bold text-lg mr-2 ml-2">Partner offer</span>
              <span>Buy this product and get upto Rs500 off</span>
            </h1>
            <h1 className="text-blue-600 font-semibold">View more coupons</h1>
          </div>
          <div>
            <h1 className="font-bold">Available offers</h1>
            <h1>
              <FontAwesomeIcon icon={faTag} className="text-green-500" />
              <span className="font-bold ml-2 mr-2">Bank offers</span>{" "}
              <span>
                10% off on Axis Bank Credit Card Transactions, up to ₹1,250 on
                orders of ₹5,000 and above
              </span>
            </h1>
            <h1>
              <FontAwesomeIcon icon={faTag} className="text-green-500" />
              <span className="font-bold ml-2 mr-2">Bank offers</span>{" "}
              <span>
                10% off on HDFC Bank Credit Card Transactions, up to ₹1,250 on
                orders of ₹5,000 and above
              </span>
            </h1>
            <h1>
              <FontAwesomeIcon icon={faTag} className="text-green-500" />
              <span className="font-bold ml-2 mr-2">Bank offers</span>{" "}
              <span>
                10% off on ICICI Bank Credit Card Transactions, up to ₹1,250 on
                orders of ₹5,000 and above
              </span>
            </h1>
            <h1>
              <FontAwesomeIcon icon={faTag} className="text-green-500" />
              <span className="font-bold ml-2 mr-2">Special Price</span>{" "}
              <span>Get extra 6% off (price inclusive of cashback/coupon)</span>
            </h1>
            <h1>
              <FontAwesomeIcon icon={faTag} className="text-green-500" />
              <span className="font-bold ml-2 mr-2">Bank offers</span>{" "}
              <span>
                10% off on SBI Bank Credit Card Transactions, up to ₹1,250 on
                orders of ₹5,000 and above
              </span>
            </h1>
          </div>
          {!(productDetails.data.mainCategory==="Fashion")&&(
            <div>
           
            <h1>For warranty details visit Brand's official website</h1>
          </div>
          )}
           {!(productDetails.data.mainCategory==="Fashion")&&(
          <div className="flex flex-row align-middle items-center  gap-5">
            <h1 className="font-semibold text-gray-400">Model year</h1>
            <h1 className="text-gray-500 border-2 text-lg font-bold p-2">
              2023
            </h1>
            <h1 className="border-blue-500 border-2 text-lg font-bold p-2">
              2022
            </h1>
          </div>
           )}
          <div className="flex flex-row align-middle items-center gap-5">
            <h1 className="font-semibold text-gray-400">Delivery</h1>
            <div className="flex flex-col gap-1 ml-2">
              <h1 className="border-b-2 font-semibold border-blue-500">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-blue-500"
                />
                <input
                  type="number"
                  name=""
                  id=""
                  value={pincode}
                  onChange={handlePincodeChange}
                  className="border-none outline-none"
                />
              </h1>
              <p
                className="text-base"
                style={{ color: message.includes("Invalid") ? "red" : "green" }}
              >
                {message}
              </p>

              <p className="text-md font-bold">
                Delivery by{" "}
                {calculateDelivery(
                  productDetails.data.price
                ).date.toDateString()}
                | {calculateDelivery(productDetails.data.price).charge}
              </p>
            </div>
          </div>
          <div className="flex flex-row  align-middle gap-8">
            <h1 className="font-semibold text-gray-400">Highlights</h1>
            <div className="flex flex-col">
              <ul className="list-disc  md:pl-6">
                {productDetails.data.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <h1 className="font-semibold text-gray-400">
              Easy Payment Options
            </h1>
            <div className="flex flex-col">
              <ul className="list-disc flex flex-col pl-2">
                <li>No cost EMI starting from ₹925/month</li>
                <li>Cash on Delivery</li>
                <li>Net banking & Credit/ Debit/ ATM card</li>
              </ul>
            </div>
          </div>
          <div>
            <img src={promo} alt="" className="md:w-1/2  h-64" />
          </div>
          <div className="flex flex-row gap-5">
            <h1 className="font-semibold text-gray-400">Description</h1>
            <p>{productDetails.data.description}</p>
          </div>
          <div className="border-2 mt-2 p-3 mr-3">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-bold">Ratings & Reviews</h1>
              <button className="border-2  shadow-slate-400 shadow-md font-bold p-2">
                <AddReview productName={productName} userName={user.name} />
              </button>
            </div>
            <Reviews productName={productName} userName={user.name} />
          </div>
          <div className="border-2 p-2">
          
             <QuestionList productName={productName} />
              <AddQuestionForm productName={productName} userName={user.name} onQuestionAdded={(question) => console.log(question)} />
            </div>
        </div>
        
      </div>
     
      <div>
        <SimilarProducts mainCategory={productDetails.data.mainCategory} subCategory={productDetails.data.subCategory} currentProductId={productDetails.data._id}/>
      </div>
    </div>
  );
};

export default ProductSingle;
