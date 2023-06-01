const mongoose = require("mongoose");
const { Schema } = mongoose;

const Message = new Schema({
  name: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    default: "",
  },
  position: {
    type: String,
    default: "",
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Message", Message);
