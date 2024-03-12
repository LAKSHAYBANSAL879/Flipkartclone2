const Address = require('../models/addressModel');
const User = require('../models/userModel');


const addAddress = async (req, res) => {
  try {
    const { houseNo, city, state, pincode, name,userName} = req.body;
    
    const existinguser = await User.findOne({ name: userName });
    if (!existinguser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newAddress = new Address({
      houseNo,
      city,
      state,
      pincode,
      name,
      userName: existinguser.name,
    });

    const savedAddress = await newAddress.save();
   

    res.status(201).json(savedAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getAddresses = async (req, res) => {
  try {
    
    
    
const address=await Address.find()
    res.status(200).json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const editAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { houseNo, city, state, pincode, name } = req.body;

    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { houseNo, city, state, pincode, name },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json(updatedAddress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  addAddress,
  getAddresses,
  editAddress,
};
