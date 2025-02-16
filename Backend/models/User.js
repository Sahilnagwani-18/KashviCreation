const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  verificationCode: Number,
  verificationCodeExpire: Date,
  accountVerified :{
    type:Boolean,
    default:false

  }
});

UserSchema.methods.generateVerificationCode = function () {
  const verificationCode = Math.floor(10000 + Math.random() * 90000); // 5-digit OTP
  this.verificationCode = verificationCode;
  this.verificationCodeExpire = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  return verificationCode;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
