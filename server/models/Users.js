import mongoose from "mongoose";
const { Schema } = mongoose;

const Users = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.Schema("User", Users);
