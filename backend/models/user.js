const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
    unique: true,
  },
  profileImage: {
    data: Buffer,
    contentType: String,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    // profileImage.data starts out as
    // { type: "Buffer", data: Array of bytes }
    // so I change it to be profileImage.data.data since the "type" is not necessary,
    // and I encode the data as base64 so that the client does not have to deal with converting it
    if (returnedObject.profileImage?.data) {
      returnedObject.profileImage.data = Buffer.from(
        returnedObject.profileImage.data.data
      ).toString("base64");
    }

    delete returnedObject._id;
    delete returnedObject.__v;

    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
