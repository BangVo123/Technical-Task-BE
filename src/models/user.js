const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username must be required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email must be required"],
    validate: {
      validator: function (value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: (props) => `${props.value} is not an email valid`,
    },
  },
  password: {
    type: String,
    required: [true, "Password must be required"],
    minLength: [6, "Password must longer or equal than 6 character"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePass = function (candidatePass, foundUserPass) {
  return bcrypt.compare(candidatePass, foundUserPass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
