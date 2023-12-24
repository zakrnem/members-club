const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, minLength: 5 },
  password: { type: String, required: true, minLength: 10 },
  membership: { type: String, required: true },
});

UserSchema.virtual("url").get(function () {
  return `/club/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
