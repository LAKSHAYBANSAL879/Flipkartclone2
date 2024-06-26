
const User =require('../models/userModel.js');
const emailValidator = require("email-validator");
const jwt=require('jsonwebtoken');
const crypto = require("crypto");
const bcrypt=require('bcrypt');

const passport = require('passport');
const multer = require('multer');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: '923305403086-qd3f6nt7f23h7052i2583ipfqrc5sill.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/api/v1/auth/google/callback',
      scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);

      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profileImageUrl: profile.photos[0].value,
          });
          await user.save();
        }

        return done(null, user);

      } catch (error) {
        console.error('Error handling Google login:', error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleLoginCallback = (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    console.log('Google Login Callback - User:', user);
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error during Google login',
        error: err.message,
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User information missing after Google login',
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error logging in user',
          error: err.message,
        });
      }

      const token = jwt.sign(
        { userId: user._id, name: user.name },
        process.env.SECRET,
        { expiresIn: '1d' }
      );

      console.log('Generated Token:', token);

      res.redirect(`http://localhost:3000/?token=${token}&user=${JSON.stringify(user)}`);
    });
  })(req, res, next);
};

exports.signup = async (req, res) => {
  try {
    // console.log('Request:', req);
    console.log('Request Body:', req.body);
        console.log('Request File:', req.file);
      const { name, email, password, phone, address } = req.body;
      if (!name || !email || !password || !phone || !address) {
          throw new Error("All fields are required");
      }

      const validateEmail = emailValidator.validate(email);
     
      if (!validateEmail) {
        throw new Error("Please enter a valid email address");
    }

   
    const adminCount = await User.countDocuments({ role: 'admin' });

    let user;

    if (adminCount === 0) {
        // If no admin exists, create an admin
        user = await User.create({
            name,
            email,
            password,
            phone,
            address,
            role: 'admin', 
        });
    } else {
      const profileImageUrl=req.file.filename;
        user = await User.create({
            name,
            email,
            password,
            phone,
            address,
            role: 'user',  
            profileImageUrl
        });
    }

      res.status(201).json({
          success: true,
          message: "User signup successfully",
          data: { user }
      });
  } catch (error) {
      if (error.code === 11000) {
          res.status(400).json({
              success: false,
              message: 'User already registered with this email',
          });
      } else {
          console.log(error);
          res.status(400).json({
              success: false,
              message: error.message,
          });
      }
  }
};
exports.updateUser = async (req, res) => {
  try {
    // const { userId } = req.context; 
    const { name, email, phone, address } = req.body;
    const user = await User.findOne({ _id: req.body.userId });
    
    let profileImageUrl;
    if (req.file) {
      profileImageUrl = req.file.filename;
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address; 
    
    if (profileImageUrl) {
      user.profileImageUrl = profileImageUrl;
    }

   
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'User details updated successfully',
      data: { user },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({ userId: user._id,name: user.name  }, process.env.SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      token,
      user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User already registered with this email',
      });
    } else {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

    exports.getuser = async (req, res) => {
        try {
          const user = await User.findOne({ _id: req.body.userId });
          return res.status(200).send({
            success: true,
            message: "User Fetched Successfully",
            user,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).send({
            success: false,
            message: "unable to get current user",
            error,
          });
        }
    };
    const JWT = require("jsonwebtoken");

    exports.userLogout = (req, res, next) => {
      try {
        const cookieOptions = {
          expires: new Date(0), 
          httpOnly: true,
        };
    
        res.cookie("token", null, cookieOptions);
        
        res.status(200).json({
          success: true,
          message: "User logged out successfully",
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    };
    exports.forgotPassword = async (req, res, next) => {
        const email = req.body.email;
      
        // return response with error message If email is undefined
        if (!email) {
          return res.status(400).json({
            success: false,
            message: "Email is required"
          });
        }
      
        try {
          // retrieve user using given email.
          const user = await User.findOne({
            email
          });
      
          // return response with error message user not found
          if (!user) {
            return res.status(400).json({
              success: false,
              message: "User not found"
            });
          }
      
          // Generate the token with userSchema method getForgotPasswordToken().
          const forgotPasswordToken = user.getForgotPasswordToken();
      
          await user.save();
      
          return res.status(200).json({
            success: true,
            token: forgotPasswordToken
          });
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: error.message
          });
        }
      };
      
      exports.resetPassword = async (req, res) => {
        const { token } = req.params;
        const { password } = req.body;
      
        // Log incoming data for debugging
        console.log('Token:', token);
        console.log('New Password:', password);
      
        // Return error message if password is missing
        if (!password) {
          return res.status(400).json({
            success: false,
            message: "New password is required"
          });
        }
      
        const hashToken = crypto.createHash("sha256").update(token).digest("hex");
      
        try {
          // Find the user using the hashed token and check the expiration date
          const user = await User.findOne({
            forgotPasswordToken: hashToken,
            forgotPasswordExpiryDate: {
              $gt: new Date() // forgotPasswordExpiryDate() less than the current date
            }
          });
      
          // Return the message if user not found
          if (!user) {
            return res.status(400).json({
              success: false,
              message: "Invalid Token or token is expired"
            });
          }
      
          // Update the user's password and save to the database
          user.password = password;
          await user.save();
      
          // Log success message and send the response
          console.log('Password successfully reset for user:', user.email);
          return res.status(200).json({
            success: true,
            message: "Successfully reset the password"
          });
        } catch (error) {
          // Log the error and send an error response
          console.error('Error resetting password:', error);
          return res.status(400).json({
            success: false,
            message: error.message
          });
        }
      };
      