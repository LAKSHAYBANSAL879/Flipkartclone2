
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

import logsignbg from "../../Assets/logsignbg.png";

Modal.setAppElement("#root");

export const Signup = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profileImageUrl, setProfileImage] = useState(null);
  useEffect(() => {
    
    openModal();
  }, []);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const registerUser = async (ev) => {
    ev.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("address", address);

      if (profileImageUrl) {
        formData.append("profileImageUrl", profileImageUrl);
      }

      await axios.post("https://flipkartclone2-o8uw.onrender.com/api/v1/auth/signup", formData);

      closeModal();
      navigate("/signin");
      console.log("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleImageChange = (ev) => {
    setProfileImage(ev.target.files[0]);
  };
  const customModalStyles = {
    content: {
      width: "50vw",
      height: "70vh",
      margin: "45px 255px",
      
      padding: "0px",
    },
  };
  return (
    <div className="w-full h-full">
      <button onClick={openModal}>Open Signup Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Signup Modal"
        style={customModalStyles}
      >
        <div className="flex flex-row w-full h-screen">
          <div className="w-1/3 h-full bg-blue-500">
            <h1 className="text-2xl text-white font-bold font-mono p-7">
              Looks like you are <br />
              new here
            </h1>
            <h1 className="text-gray-200 font-bold px-8">
              Signup with your basic information to get started and enjoy your
              shopping expirence
            </h1>
            <img src={logsignbg} alt="" className="pl-7 pt-9" />
          </div>

          <div className="w-2/3 bg-white p-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              Register Yourself
            </h2>
            <span className="close relative -top-24 cursor-pointer left-full text-2xl font-bold text-blue-500" onClick={closeModal}>
          &times;
        </span>
          <form className="space-y-6" action="https://flipkartclone2-o8uw.onrender.com/api/v1/auth/signup" onSubmit={registerUser} method="POST" encType="multipart/form-data">
            
              
              <div>
               <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                 Name
               </label>
               <div className="mt-2">
                 <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  autoComplete="name"
                  required
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                  autoComplete="phone"
                  required
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={address}
                  onChange={(ev) => setAddress(ev.target.value)}
                  autoComplete="address"
                  required
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  autoComplete="email"
                  required
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  autoComplete="current-password"
                  required
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="profileImage" className="block text-sm font-medium leading-6 text-gray-900">
                Profile Image
              </label>
              <div className="mt-2">
                <input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  onChange={handleImageChange}
                  className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-3 py-1.5 bg-orange-600 text-white font-bold hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              Already registered?{" "}
              <Link
                to="/signin"
                className="font-semibold text-lg leading-6 text-blue-600 hover:text-blue-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
