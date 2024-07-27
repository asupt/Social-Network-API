const {User, Thought} = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thought.find({})
            .then(thought => res.json(thought))
            .catch(err => res.json(err))
    },
    //get thought
    getThought(req, res) {
        Thought.findOne({ _id: req.params.userId})
        .catch((err) => res.status(500).json(err));
    },
    //post thought
    postThought(req, res) {
        Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
        })
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    //update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    //delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete(
            {_id: req.params.thoughtId}
        )
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    ////////////////////////////////// reactions ///////////////////////////

    //post reaction
    postReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    ///
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    }
};