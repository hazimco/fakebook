const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    maxLength: 140,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Post", postSchema);
