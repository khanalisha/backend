const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
  age: Number,
  city: String,
  is_married: String,
});

// name ==> String
// email ==> String
// gender ==> String
// password ==> String
// age ==> Number
// city ==> String
// is_married ==> boolean

const userModal = mongoose.model("users", userSchema);
module.exports = {
  userModal,
};
