import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit } from "@fortawesome/free-regular-svg-icons";
import { faBox, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import profilebg from "../../Assets/profilebg.png"
export const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useNavigate();

  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editEmail,setEditEmail]=useState(false);
  const [editProfile,setEditProfile]=useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newPhone, setNewPhone] = useState(user.phone);
  const [newAddress, setNewAddress] = useState(user.address);
  const [newEmail,setNewEmail]=useState(user.email);
  const [profileImage,setNewProfile]=useState(null);
  const handleLogout = () => {
    setUser(null);
    Cookies.remove("token");
    history("/signin");
  };

  const handleUpdateProfile = async () => {
    try {
      const token = Cookies.get("token");

      const formData = new FormData();
      formData.append("name", newName);
      formData.append("phone", newPhone);
      formData.append("address", newAddress);
      formData.append("email", newEmail);
      

      if (profileImage) {
        formData.append("profileImageUrl", profileImage);
        console.log("new pp is",profileImage);
      }

      const response = await axios.put(
        "http://localhost:8080/api/v1/auth/update",
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast.success("User information updated successfully");
      console.log("updated user is",user);
      setUser(response.data.data.user);

      setEditName(false);
      setEditPhone(false);
      setEditAddress(false);
      setEditEmail(false);
      setEditProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFileChange = (e) => {
    setNewProfile(e.target.files[0]);
  };


  return (
    <div className="bg-gray-100 p-4">
      <div className="flex flex-row">
        <div className="flex  ml-24 flex-col w-1/4 align-middle ">
         
          <div>
                  <div className="flex flex-row align-middle gap-5">
                
                {editProfile ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="border-none outline-none"
                    />
                    <button onClick={handleUpdateProfile}>Save</button>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setEditProfile(true)}
                    />
                  </>
                )}
              </div>

              {editProfile ? (
                <div className="bg-gray-50  border-blue-500 p-2">
                  {user.profileImageUrl && (
                    <img
                      src={`http://localhost:8080/api/v1/auth/uploadss/${user.profileImageUrl}`}
                      alt="Profile"
                      className="block mx-auto mt-2 rounded-full h-16 w-16 object-cover"
                    />
                  )}
                </div>
              ) : (
                <div className="bg-white  p-2 flex items-center">
                  {user.profileImageUrl && (
                    <img
                      src={`http://localhost:8080/api/v1/auth/uploadss/${user.profileImageUrl}`}
                      alt="Profile"
                      className="block ml-4 mt-2 rounded-full h-16 w-16 object-cover"
                    />
                  )}
                  <h1 className="font-bold text-xl">Hello, {user.name}</h1>
                </div>
                
              
              )}
            </div>
          <div className="bg-white mt-2 flex flex-col font-bold p-2">
            <Link to="/orders" className="text-gray-500 text-xl border-b-2">
              <FontAwesomeIcon icon={faBox} className="mr-2 text-blue-500" />
              My Orders
            </Link>
           <h1 className="mt-4 text-xl text-gray-500 border-b-2"><FontAwesomeIcon icon={faUser} className="text-blue-500"/>Account settings</h1>
           <div className="border-b-2 p-1 text-gray-900 font-normal text-lg ">
            <h1 className="font-bold">My Stuff</h1>
            <h1>My coupons</h1>
            <h1>All notifications</h1>
            <Link to='/wishlist'>My wishlist</Link>
           </div>
          </div>
          <div className="text-lg bg-white mt-2 text-gray-500 font-semibold">
          <button
            onClick={handleLogout}
            className=" py-2 px-4 rounded-md hover:text-blue-500"
          >
           <FontAwesomeIcon icon={faPowerOff} className="text-blue-500"/> Logout
          </button>
          </div>
        </div>
      
      <div className="ml-8 w-1/2 text-lg   bg-white overflow-hidden shadow-md">
        <div className="p-4 flex flex-col gap-5">
          {user ? (
            <>
              <div className="mb-2 flex flex-col gap-2">
                <div className="flex flex-row align-middle items-center gap-5">
                <strong>Personal Information</strong>
                {editName ? (
                  <>
                   
                    <button onClick={handleUpdateProfile}>Save</button>
                  </>
                ) : (
                  <>
                   
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setEditName(true)}
                    />
                  </>
                )}
                </div>
                
                {editName ? (
                  <div className="bg-gray-50 border-2 border-blue-500 p-2">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="border-none outline-none"
                    />
                    
                  </div>
                ) : (
                  <div className="bg-gray-50 p-2 min-w-64 max-w-fit  border-2 ">
                    {user.name}
                   
                  </div>
                )}
              </div>
              <div className="mb-2 flex flex-col gap-2">
                <div className="flex flex-row align-middle items-center gap-5">
                <strong>Email Address</strong>
                {editEmail ? (
                  <>
                   
                    <button onClick={handleUpdateProfile}>Save</button>
                  </>
                ) : (
                  <>
                   
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setEditName(true)}
                    />
                  </>
                )}
                </div>
                
                {editEmail ? (
                  <div className="bg-gray-50 border-2 border-blue-500 p-2">
                    <input
                      type="text"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="border-none outline-none"
                    />
                    
                  </div>
                ) : (
                  <div className="bg-gray-50 p-2 min-w-64 max-w-fit  border-2 ">
                    {user.email}
                   
                  </div>
                )}
              </div>
              <div className="mb-2 flex flex-col gap-2">
                <div className="flex flex-row align-middle items-center gap-5">
                <strong>Phone Number</strong>
                {editPhone ? (
                  <>
                   
                    <button onClick={handleUpdateProfile}>Save</button>
                  </>
                ) : (
                  <>
                   
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setEditPhone(true)}
                    />
                  </>
                )}
                </div>
                
                {editPhone ? (
                  <div className="bg-gray-50 border-2 border-blue-500 p-2">
                    <input
                      type="text"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="border-none outline-none"
                    />
                    
                  </div>
                ) : (
                  <div className="bg-gray-50 p-2 min-w-64 max-w-fit  border-2 ">
                    {user.phone}
                   
                  </div>
                )}
              </div>
              
              <div className="mb-2 flex flex-col gap-2">
                <div className="flex flex-row align-middle items-center gap-5">
                <strong>Primary Address</strong>
                {editAddress ? (
                  <>
                   
                    <button onClick={handleUpdateProfile}>Save</button>
                  </>
                ) : (
                  <>
                   
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setEditAddress(true)}
                    />
                  </>
                )}
                </div>
                
                {editAddress ? (
                  <div className="bg-gray-50 border-2 border-blue-500 p-2">
                    <input
                      type="text"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      className="border-none outline-none"
                    />
                    
                  </div>
                ) : (
                  <div className="bg-gray-50 p-2 min-w-96 max-w-fit  border-2 ">
                    {user.address}
                   
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
<h1 className="text-xl font-bold mb-2">FAQs</h1>
<h1 className="text-base font-semibold">What happens when I update my email address (or mobile number)?</h1>
<p className="text-sm pr-4">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
<h1  className="text-base font-semibold">When will my Flipkart account be updated with the new email address (or mobile number)?</h1>
<p className="text-sm pr-4">Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
<h1 className="text-base font-semibold">Does my Seller account get affected when I update my email address?</h1> 
<p className="text-sm pr-4">Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>  
              </div>
            <div>
<img src={profilebg} alt="" className="w-full"/>
            </div>
            </>
          ) : (
            <p>Loading user data...</p>
          )}

         
        </div>
      </div>
      </div>
    </div>
  );
};
