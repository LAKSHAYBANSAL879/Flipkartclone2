import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState(['']);
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState(['']);
  const [rating, setRating] = useState(0);
  const [color, setColor] = useState('');
const[mrp,setMrp]=useState(0);
 const Navigate=useNavigate();
  const handleArrayInputChange = (index, value, arrayType) => {
    const updatedArray = [...arrayType];
    updatedArray[index] = value;

    if (arrayType === images) {
      setImages(updatedArray);
    } else if (arrayType === features) {
      setFeatures(updatedArray);
    }
  };

  
  const handleAddArrayItem = (ev,arrayType) => {
    ev.preventDefault();
    if (arrayType === images) {
      setImages([...images, '']); 
    } else if (arrayType === features) {
      setFeatures([...features, '']); 
    }
  };

  async function saveProduct(ev) {
    ev.preventDefault();

    const productData = {
      mainCategory,
      subCategory,
      name,
      brand,
      price,
      images,
      description,
      features,
      rating,
      color,
      mrp,
    };

    try {
      await axios.post('http://localhost:8080/api/v1/products/newProduct', productData);
      toast.success('New product has been added successfully');
      Navigate('/');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  }

  return (
    <div className="overflow-hidden">
      <form
        onSubmit={saveProduct}
        className="w-full max-w-2xl mx-auto mt-8 p-8 border border-gray-300 rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Product and Become our Seller</h2>
        <div className="mb-4">
          <label htmlFor="SellerName" className="block text-lg  font-bold text-gray-600">
          Seller Name
          </label>
          <input
            type="text"
            id="sellername"
            name="sellername"
            
            placeholder="Enter Main Category"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mainCategory" className="block text-lg  font-bold text-gray-600">
          Main Category of Product
          </label>
          <input
            type="text"
            id="mainCategory"
            name="mainCategory"
            value={mainCategory}
            onChange={(ev) => setMainCategory(ev.target.value)}
            placeholder="Enter Main Category"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subCategory" className="block text-lg  font-bold text-gray-600">
          Sub Category of Product
          </label>
          <input
            type="text"
            id="subCategory"
            name="subCategory"
            value={subCategory}
            onChange={(ev) => setSubCategory(ev.target.value)}
            placeholder="Enter Sub Category"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg  font-bold text-gray-600">
          Name of product
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="Enter Product Name"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="brand" className="block text-lg  font-bold text-gray-600">
         Brand Name
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={brand}
            onChange={(ev) => setBrand(ev.target.value)}
            placeholder="Enter Brand Name"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mrp" className="block text-lg  font-bold text-gray-600">
       MRP of product :
          </label>
          <input
            type="number"
            id="mrp"
            name="mrp"
            value={mrp}
            onChange={(ev) => setMrp(ev.target.value)}
            placeholder="Enter Mrp of product"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-lg  font-bold text-gray-600">
        Selling Price :
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            placeholder="Enter discounted/selling price"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-lg  font-bold text-gray-600">
          Rating of Product
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={rating}
            onChange={(ev) => setRating(ev.target.value)}
            placeholder="Enter rating"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg  font-bold text-gray-600">
        Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="Enter description of product"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="color" className="block text-lg  font-bold text-gray-600">
          Color of Product
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={color}
            onChange={(ev) => setColor(ev.target.value)}
            placeholder="Enter color"
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-extrabold mb-2">Images</h3>
          {images.map((image, index) => (
            <div key={index} className="mb-2">
              <label htmlFor={`image${index}`} className="block text-sm font-medium text-gray-600">
                Image {index + 1}
              </label>
              <input
                type="text"
                id={`image${index}`}
                name={`images[${index}]`}
                value={image}
                onChange={(ev) => handleArrayInputChange(index, ev.target.value, images)}
                placeholder={`Image URL ${index + 1}`}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          ))}
          <button
            className="bg-blue-500 text-white font-bold rounded-md p-2"
            onClick={(ev) => handleAddArrayItem(ev,images)}
          >
            Add Image
          </button>
        </div>

        
        <div className="mb-4">
          <h3 className="text-xl font-extrabold mb-2">Features</h3>
          {features.map((feature, index) => (
            <div key={index} className="mb-2">
              <label htmlFor={`feature${index}`} className="block text-sm font-medium text-gray-600">
                Feature {index + 1}
              </label>
              <input
                type="text"
                id={`feature${index}`}
                name={`features[${index}]`}
                value={feature}
                onChange={(ev) => handleArrayInputChange(index, ev.target.value, features)}
                placeholder={`Feature ${index + 1}`}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          ))}
          <button
            className="bg-blue-500 text-white font-bold rounded-md p-2"
            onClick={(ev) => handleAddArrayItem(ev,features)}
          >
            Add Feature
          </button>
        </div>

        <button className="bg-red-500 text-white font-bold rounded-md p-2" type="submit">
          Save Product
        </button>
      </form>
    </div>
  );
}
