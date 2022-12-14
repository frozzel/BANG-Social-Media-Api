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
                  { _id: params.userId },
                  { $push: { thought: _id } },
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
  deleteThought(req, res ) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then( dbThoughtsData => {
       if ( !dbThoughtsData ) {
          return res.status( 404 ).json({ message: 'No thought found with this ID!' });
          
       };
       return User.findOneAndUpdate(
        {thought: req.params.thoughtId},
        {$pull: {thought: req.params.thoughtId}},
        {new: true}
       );
    })
    .then((dbUserData)=>{
        if (!dbUserData){
            return res.status(404).json({message: 'No user with this id!'})
        }
        res.json({message: "Thought Sucessfully deleted"});
    })
    .catch((err) => {res.status(500).json(err);
 })
},

  // add reaction
  addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
          { _id: params.thoughtId },
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
      Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.id } } },
          { new: true }
      )
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
  }
};

module.exports = thoughtController;