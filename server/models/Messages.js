const mongoose = require("mongoose");
const { Schema } = mongoose;

const Message = new Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  msg: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Message", Message);
