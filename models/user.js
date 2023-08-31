const { Schema, model } = require("mongoose");

// define table columns and configuration
const userSchema = new Schema(
  {
    // define a username column
    username: {
      type: String,
      allowNull: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\w+@\w+(\.\w{2,3})+/, "Invalid email address"],
    },
    // define a thoughts collumn
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length
})

const User = model("user", userSchema);

module.exports = User;
