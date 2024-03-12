import { Navbar } from "./Components/Navbar/Navbar";
import { Route, Routes } from 'react-router-dom';

import { UserContextProvider } from "./UserContext";
import Home from "./Components/Home/Home";
import { LoginSignup } from "./Components/Signup/LoginSignup";
import { Signup } from "./Components/Signup/Signup";
import { Profile } from "./Components/Signup/Profile";
import Category from "./Components/Navbar/Category";
import ProductDisplay from "./Components/Products/Products";
import CatPage from "./Components/Products/CatPage";
import Wishlist from "./Components/Wishlist/Wishlist";
import WishlistProvider from "./Components/Wishlist/WishlistProvider";
import ProductSingle from "./Components/Products/ProductSingle";
import AddProduct from "./Components/Products/AddProduct";
import CartContextProvider from "./CartContext";
import Cart from "./Components/Buy/Cart";
import Footer from "./Components/Home/Footer";
import CheckOut from "./Components/Buy/CheckOut";
import Orders from "./Components/Orders/Orders";
import OrderSingle from "./Components/Orders/OrderSingle";
import PaymentSuccessful from "./Components/Buy/PaymentSuccessful";
import GoogleLoginHandler from "./Components/Signup/GoogleLogin";
import { ToastContainer } from "react-toastify";
import SuperCoins from "./Components/Orders/SuperCoins";
import SuperCo from "./Components/Orders/SuperCo";
import OrderSuccess from "./Components/Orders/OrderSucess";

function App() {
  return (
    <div className="w-full">
    <UserContextProvider>
      <WishlistProvider>
        <CartContextProvider>
        <Navbar />
        <Category />
        <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        <Routes>
     
          <Route path="/" element={<Home />} />
          <Route path='/signin' element={<LoginSignup />} />
          <Route path='/userSignup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/:mainCategory/:subCategory" element={<ProductDisplay />} />
          <Route path="/:mainCategory" element={<CatPage />} />
          <Route path="/product/:name" element={<ProductSingle/>}/>
          <Route path="/addProduct" element={<AddProduct/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<CheckOut/>}/>
          <Route path="/orders" element={<Orders/>}/>
<Route path='/order/:orderId' element={<OrderSingle/>}/>
<Route path="/paymentsuccess" element={<PaymentSuccessful/>}/>
<Route path="/google-login-handler/:token/:user" element={<GoogleLoginHandler />} />
<Route path='/supercoins' element={<SuperCoins/>}/>
<Route path='/superhist' element={<SuperCo/>}/>
<Route path='/ordersuccess/:orderId' element={<OrderSuccess/>}/>

        </Routes>
        <Footer/>
        </CartContextProvider>
       
      </WishlistProvider>
    </UserContextProvider>
    </div>
  );
}

export default App;

