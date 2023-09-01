const { User, Thought } = require("../models");

module.exports = {
  // Get all thought
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      if (newThought) {
        await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: newThought._id } },
          { new: true }
        );
      }
      res.json("Thought created.");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      if (newThought) {
        await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: newThought._id } },
          { new: true }
        );
      }
      res.json("Thought created.");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(course)
      .catch((err) => res.status(500).json(err));
  },
// Create a reaction
async createReaction(req, res) {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body; // Assuming you have these fields in the request body
    
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      {
        $push: {
          reactions: {
            reactionBody,
            username,
          },
        },
      },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(updatedThought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},
// Delete a reaction
async deleteReaction(req, res) {
  try {
    const { thoughtId, reactionId } = req.params;

    const updatedThought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      {
        $pull: {
          reactions: { _id: reactionId },
        },
      },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(updatedThought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

};
