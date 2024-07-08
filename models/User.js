const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
    job: {
      type: String,
    },
    phoneNo: {
      type: String,
      sparse: true,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.statics.login = async function(username, email, password) {
  // Check if the username exists
  const userByUsername = await this.findOne({ username });
  if (!userByUsername) {
    throw Error("incorrect username");
  }

  // Check if the email exists for the given username
  const userByEmail = await this.findOne({ username, email });
  if (!userByEmail) {
    throw Error("incorrect email");
  }

  // Validate the password
  const auth = await bcrypt.compare(password, userByEmail.password);
  if (!auth) {
    throw Error("incorrect password");
  }

  return userByEmail;
};

userSchema.pre('findOneAndDelete', async function(next) {
  const userId = this.getFilter()['_id'];
  try {
    await mongoose.model('Lend').deleteMany({ userId }, { timeout: false });
    await mongoose.model('Owe').deleteMany({ userId }, { timeout: false });
    await mongoose.model('Debt').deleteMany({ userId }, { timeout: false });
    await mongoose.model('Record').deleteMany({ userId }, { timeout: false });
    await mongoose.model('Account').deleteMany({ userId }, { timeout: false });
    await mongoose.model('Budget').deleteMany({ userId }, { timeout: false });
    await mongoose.model('Tobuylist').deleteMany({ userId }, { timeout: false });
    await mongoose.model('ItemToBuy').deleteMany({ userId }, { timeout: false });
    await mongoose.model('Book').deleteMany({ userId }, { timeout: false });
    await mongoose.model('Category').deleteMany({ userId }, { timeout: false });
    await mongoose.model('Goal').deleteMany({ userId }, { timeout: false });
    await mongoose.model('Setting').deleteMany({ userId }, { timeout: false });
    await mongoose.model('Video').deleteMany({ userId }, { timeout: false });
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
