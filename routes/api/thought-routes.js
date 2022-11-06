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

// Route to /api/thought/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// Route to /api/thought/:userId
router.route('/:id').post( addThought);

// Route to /api/thought/:thoughtId/reactions
router.route( '/:id/reactions' ).post( addReaction );

// Route to /api/thought/:thoughtId/reactions/:reactionId
router.route( '/:id/reactions/:reactionId' ).delete(deleteReaction);

module.exports = router;