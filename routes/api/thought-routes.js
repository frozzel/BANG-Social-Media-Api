const router = require( 'express' ).Router();

const { 
   addThought,
   getAllThought,
   getThoughtById,
   updateThought,
   deleteThought,
   addReaction,
   deleteReaction
} = require ( '../../controllers/thought-controller' );

// Route to /api/thought
router.route('/').get(getAllThought);

router.route('/:userId').post(addThought);

// Route to /api/thought/:id
router.route('/:id').get(getThoughtById).put(updateThought);

router.route('/:userID/thought/:thoughtId').delete(deleteThought);

// Route to /api/thought/:thoughtId/reactions
router.route( '/:thoughtId/reactions' ).post(addReaction);

// Route to /api/thought/:thoughtId/reactions/:reactionId
router.route( '/:thoughtId/reactions/:reactionId' ).delete(deleteReaction);

module.exports = router;