const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, minLength: 5 },
  password: { type: String, required: true, minLength: 10 },
  membership: { type: String, required: true },
  created_date: { type: Date, default: Date.now },
});

UserSchema.virtual("url").get(function () {
  return `/club/user/${this._id}`;
});

UserSchema.virtual("fullname").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model("User", UserSchema);
