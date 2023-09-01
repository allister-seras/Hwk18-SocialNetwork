const { Schema, model } = require("mongoose");
const formattedDate = require("../utils/formatDate.js")

// Define the reaction sub-document schema
const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => formattedDate(date)
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Define the thought schema with the reactions sub-document
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => formattedDate(date)
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Embed the reaction sub-document
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;