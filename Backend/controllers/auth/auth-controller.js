const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const { sendEmail } = require("../../utils/sendEmail.util");
// //register
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

//     await newUser.save();
//     res.status(200).json({
//       success: true,
//       message: "Registration successful",
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured",
//     });
//   }
// };

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    // Generate OTP
    const verificationCode = newUser.generateVerificationCode();
    await newUser.save();

    function generateEmailTemplate(verificationCode) {
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

    // Example verification code

    // Send OTP via email
    const message = generateEmailTemplate(verificationCode);
    await sendEmail({ email, subject: "Email Verification", message });

    res.status(200).json({
      success: true,
      message:
        "Registration successful. Please check your email for the verification code.",
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
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email, verificationCode: otp });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP or email.",
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
      message: "Email verified successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// //login
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const checkUser = await User.findOne({ email });
//     if (!checkUser)
//       return res.json({
//         success: false,
//         message: "User doesn't exists! Please register first",
//       });

//     const checkPasswordMatch = await bcrypt.compare(
//       password,
//       checkUser.password
//     );
//     if (!checkPasswordMatch)
//       return res.json({
//         success: false,
//         message: "Incorrect password! Please try again",
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
//       message: "Some error occured",
//     });
//   }
// };

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first.",
      });

    // Check if email is verified
    if (!checkUser.accountVerified) {
      return res.json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again.",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
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

//logout

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
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
