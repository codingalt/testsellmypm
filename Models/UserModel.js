const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: [6, "Password must be atleast 6 character"],
    },
    confirmPass: {
      type: String,
      required: true,
      min: [6, "Password must be atleast 6 character"],
    },
    terms: {
      type: String,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    subscription: [{
      package: {
        type: String,
        default: "free"
      },
      packageType: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      expiryDate: {
        type: Date,
        required: true,
      },
      createdDate: {
        type: Date,
        required: true
      }
    }],
    profilePicture: {
      public_id: {
        type: String
      },
      url: {
        type: String,
      }
    },
    about: String,
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

//Password hashing

userSchema.pre("save", async function (next) {
  console.log("pre method");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPass = await bcrypt.hash(this.confirmPass, 12);
  }
  next();
});

// Generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const UserModel = mongoose.model("Users", userSchema);
module.exports = UserModel;
