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
  positon: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Message", Message);
