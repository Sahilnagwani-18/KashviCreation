// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../../models/User");

// const { sendEmail } = require("../../utils/sendEmail.util");


// const registerUser = async (req, res) => {
//   const { userName, email, password } = req.body;

//   try {
//     const checkUser = await User.findOne({ email });
//     if (checkUser)
//       return res.json({
//         success: false,
//         message: "User Already exists with the same email! Please try again",
//       });

//     const hashPassword = await bcrypt.hash(password, 12);
//     const newUser = new User({
//       userName,
//       email,
//       password: hashPassword,
//     });

//     // Generate OTP
//     const verificationCode = newUser.generateVerificationCode();
//     await newUser.save();

//     function generateEmailTemplate(verificationCode) {
//       return `
//        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
//   <!-- Header with Logo -->
//   <div style="text-align: center; margin-bottom: 20px;">
//     <img src="http://localhost:5173/images/Kashvi.png" alt="Kashvi Creation Logo" style="width: 150px; height: auto; margin-bottom: 10px;" />
//     <h2 style="color: #FF6F00; font-size: 24px; font-weight: bold; margin: 0;">Verification Code</h2>
//   </div>

//   <!-- Body Content -->
//   <div style="color: #333; font-size: 16px; line-height: 1.6;">
//     <p>Dear User,</p>
//     <p>Your verification code is:</p>
//     <div style="text-align: center; margin: 20px 0;">
//       <span style="display: inline-block; font-size: 28px; font-weight: bold; color: #FF6F00; padding: 15px 30px; border: 2px solid #FF6F00; border-radius: 8px; background-color: #FFF3E0;">
//         ${verificationCode}
//       </span>
//     </div>
//     <p>Please enter this code on the website to verify your email address. The code will expire in <strong>10 minutes</strong>.</p>
//     <p>If you did not request this, please ignore this email.</p>
//   </div>

//   <!-- Footer -->
//   <footer style="margin-top: 30px; text-align: center; font-size: 14px; color: #777;">
//     <p>Thank you,<br><strong>Kashvi Creation</strong></p>
//     <p style="font-size: 12px; color: #aaa; margin-top: 10px;">
//       This is an automated message. Please do not reply to this email.
//     </p>
//   </footer>
// </div>
//       `;
//     }

//     // Example verification code

//     // Send OTP via email
//     const message = generateEmailTemplate(verificationCode);
//     await sendEmail({ email, subject: "Email Verification", message });

//     res.status(200).json({
//       success: true,
//       message:
//         "Registration successful. Please check your email for the verification code.",
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred",
//     });
//   }
// };

// const verifyOTP = async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const user = await User.findOne({ email, verificationCode: otp });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP or email.",
//       });
//     }

//     // Check if OTP is expired
//     if (Date.now() > user.verificationCodeExpire) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP has expired. Please request a new one.",
//       });
//     }

//     // Mark user as verified
//     user.accountVerified = true;
//     user.verificationCode = null;
//     user.verificationCodeExpire = null;
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Email verified successfully!",
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred",
//     });
//   }
// };



// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const checkUser = await User.findOne({ email });
//     if (!checkUser)
//       return res.json({
//         success: false,
//         message: "User doesn't exist! Please register first.",
//       });

//     // Check if email is verified
//     if (!checkUser.accountVerified) {
//       return res.json({
//         success: false,
//         message: "Please verify your email before logging in.",
//       });
//     }

//     const checkPasswordMatch = await bcrypt.compare(
//       password,
//       checkUser.password
//     );
//     if (!checkPasswordMatch)
//       return res.json({
//         success: false,
//         message: "Incorrect password! Please try again.",
//       });

//     const token = jwt.sign(
//       {
//         id: checkUser._id,
//         role: checkUser.role,
//         email: checkUser.email,
//         userName: checkUser.userName,
//       },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "60m" }
//     );

//     res.cookie("token", token, { httpOnly: true, secure: false }).json({
//       success: true,
//       message: "Logged in successfully",
//       user: {
//         email: checkUser.email,
//         role: checkUser.role,
//         id: checkUser._id,
//         userName: checkUser.userName,
//       },
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occurred",
//     });
//   }
// };

// //logout

// const logoutUser = (req, res) => {
//   res.clearCookie("token").json({
//     success: true,
//     message: "Logged out successfully!",
//   });
// };

// //auth middleware
// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token)
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorised user!",
//     });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "Unauthorised user!",
//     });
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   logoutUser,
//   authMiddleware,
//   verifyOTP,
// };


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const { sendEmail } = require("../../utils/sendEmail.util");
const { sendOTPViaSMS } = require("../../utils/sendSMS.util"); // Assuming you have an SMS utility

const registerUser = async (req, res) => {
  const { userName, email, password, phoneNumber } = req.body;

  try {
    // Check if user already exists with the same email or phone number
    const checkUserByEmail = await User.findOne({ email });
    const checkUserByPhone = await User.findOne({ phoneNumber });

    if (checkUserByEmail) {
      return res.json({
        success: false,
        message: "User already exists with the same email! Please try again.",
      });
    }

    if (checkUserByPhone) {
      return res.json({
        success: false,
        message: "User already exists with the same phone number! Please try again.",
      });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      userName,
      email,
      phoneNumber,
      password: hashPassword,
    });

    // Generate OTP
    const verificationCode = newUser.generateVerificationCode();
    await newUser.save();

    const otpSMSMessage = `Welcome To Kashvi Creation !!
    Your verification code is: ${verificationCode}. This code will expire in 10 minutes.`;
    

    // Generate email template for OTP
    function generateOTPEmailTemplate(verificationCode) {
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <!-- Header with Logo -->
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="http://localhost:5173/images/Kashvi.png" alt="Kashvi Creation Logo" style="width: 150px; height: auto; margin-bottom: 10px;" />
            <h2 style="color: #FF6F00; font-size: 24px; font-weight: bold; margin: 0;">Verification Code</h2>
          </div>

          <!-- Body Content -->
          <div style="color: #333; font-size: 16px; line-height: 1.6;">
            <p>Dear User,</p>
            <p>Your verification code is:</p>
            <div style="text-align: center; margin: 20px 0;">
              <span style="display: inline-block; font-size: 28px; font-weight: bold; color: #FF6F00; padding: 15px 30px; border: 2px solid #FF6F00; border-radius: 8px; background-color: #FFF3E0;">
                ${verificationCode}
              </span>
            </div>
            <p>Please enter this code on the website to verify your email address. The code will expire in <strong>10 minutes</strong>.</p>
            <p>If you did not request this, please ignore this email.</p>
          </div>

          <!-- Footer -->
          <footer style="margin-top: 30px; text-align: center; font-size: 14px; color: #777;">
            <p>Thank you,<br><strong>Kashvi Creation</strong></p>
            <p style="font-size: 12px; color: #aaa; margin-top: 10px;">
              This is an automated message. Please do not reply to this email.
            </p>
          </footer>
        </div>
      `;
    }

    // Generate welcome email template
    function generateWelcomeEmailTemplate(userName) {
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <!-- Header with Logo -->
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="http://localhost:5173/images/Kashvi.png" alt="Kashvi Creation Logo" style="width: 150px; height: auto; margin-bottom: 10px;" />
            <h2 style="color: #FF6F00; font-size: 24px; font-weight: bold; margin: 0;">Welcome to Kashvi Creation!</h2>
          </div>

          <!-- Body Content -->
          <div style="color: #333; font-size: 16px; line-height: 1.6;">
            <p>Dear ${userName},</p>
            <p>Thank you for registering with Kashvi Creation! We are excited to have you on board.</p>
            <p>Your account has been successfully created. Please verify your email address using the OTP sent to your email and phone number.</p>
            <p>If you have any questions or need assistance, feel free to contact us.</p>
          </div>

          <!-- Footer -->
          <footer style="margin-top: 30px; text-align: center; font-size: 14px; color: #777;">
            <p>Thank you,<br><strong>Kashvi Creation</strong></p>
            <p style="font-size: 12px; color: #aaa; margin-top: 10px;">
              This is an automated message. Please do not reply to this email.
            </p>
          </footer>
        </div>
      `;
    }

    // Send OTP via email
    const otpEmailMessage = generateOTPEmailTemplate(verificationCode);
    

    // Send welcome email
    const welcomeEmailMessage = generateWelcomeEmailTemplate(userName);
    

    // Send OTP via SMS
    

    // Send welcome SMS
    const welcomeSMSMessage = `Welcome to Kashvi Creation, ${userName}! Thank you for registering with us.`;
    


    await Promise.all([
      sendOTPViaSMS(phoneNumber, otpSMSMessage),
      sendOTPViaSMS(phoneNumber, welcomeSMSMessage),
      sendEmail({ email, subject: "Email Verification", message: otpEmailMessage }),
      sendEmail({ email, subject: "Welcome to Kashvi Creation!", message: welcomeEmailMessage })
  ]);

    res.status(200).json({
      success: true,
      message:
        "Registration successful. Please check your email and phone for the verification code and welcome messages.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const verifyOTP = async (req, res) => {
  const { email, phoneNumber, otp } = req.body;

  try {
    let user;
    if (email) {
      user = await User.findOne({ email, verificationCode: otp });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber, verificationCode: otp });
    } else {
      return res.status(400).json({
        success: false,
        message: "Email or phone number is required.",
      });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP or email/phone number.",
      });
    }

    // Check if OTP is expired
    if (Date.now() > user.verificationCodeExpire) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // Mark user as verified
    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Account verified successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  try {
    let checkUser;
    if (email) {
      checkUser = await User.findOne({ email });
    } else if (phoneNumber) {
      checkUser = await User.findOne({ phoneNumber });
    } else {
      return res.json({
        success: false,
        message: "Email or phone number is required.",
      });
    }

    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first.",
      });
    }

    // Check if account is verified
    if (!checkUser.accountVerified) {
      return res.json({
        success: false,
        message: "Please verify your account before logging in.",
      });
    }

    // Check password
    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        phoneNumber: checkUser.phoneNumber,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        phoneNumber: checkUser.phoneNumber,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// Logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

// Auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  verifyOTP,
};
