const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true, minLength: 10 },
  date: { type: Date, default: Date.now },
});

MessageSchema.virtual("url").get(function () {
  return `/club/message/${this._id}`;
});

module.exports = mongoose.model("Message", MessageSchema);
