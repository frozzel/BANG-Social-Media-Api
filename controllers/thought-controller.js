const { User, Thought } = require( '../models' );

const thoughtController = {
  // get all thoughts
  getAllThought(req, res) {
      Thought.find({})
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
  },

  // get one user by id
  getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
          .then(dbThoughtData => {
              if (!dbThoughtData) {
                  res.status(404).json({ message: 'No thought found with this id!' });
                  return;
              }
              res.json(dbThoughtData);
          })
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
  },

  // add thought to user
  addThought({ params, body }, res) {
      console.log(body);
      Thought.create(body)
          .then(({ _id }) => {
              return User.findOneAndUpdate(
                  { _id: params.User.id },
                  { $push: { thoughts: _id } },
                  { new: true }
              );
          })
          .then(dbUserData => {
              if (!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id!' });
                  return;
              }
              res.json(dbUserData);
          })
          .catch(err => res.json(err));
  },

  // update thought by id
  updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbThoughtData => {
              if (!dbThoughtData) {
                  res.status(404).json({ message: 'No thought found with this id!' });
                  return;
              }
              res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));
  },

  // remove thought
  deleteThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
          .then(deletedThought => {
              if (!deletedThought) {
                  return res.status(404).json({ message: 'No thought with this id!' });
              }
              return User.findOneAndUpdate(
                  { _id: params.User.id },
                  { $pull: { thoughts: params.id } },
                  { new: true }
              );
          })
          .then(dbUserData => {
              if (!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id!' });
                  return;
              }
              res.json(dbUserData);
          })
          .catch(err => res.json(err));
  },

  // add reaction
  addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
          { _id: params.id },
          { $addToSet: { reactions: body } },
          { new: true, runValidators: true }
      )
          .then(dbThoughtData => {
              if (!dbThoughtData) {
                  return res.status(404).json({ message: 'No thought found with this id!' });
              }
              res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
  },

  // remove reaction
  deleteReaction({ params }, res) {
      console.log(params.id, params.id);
      Thought.findOneAndUpdate(
          { _id: params.id },
          { $pull: { reactions: { _id: params.id } } },
          { runValidators: true, new: true }
      )
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
  }
};

module.exports = thoughtController;