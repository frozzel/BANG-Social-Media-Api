const router = require( 'express' ).Router();

const {
   createUser,
   getAllUser,
   getUserById,
   updateUser,
   deleteUser,
   addFriend,
   deleteFriend
} = require( '../../controllers/user-controller' );


// Route to /api/user
router.route( '/' ).get( getAllUser ).post( createUser );

// Route to /api/user/:id
router.route( '/:id' ).get( getUserById ).put( updateUser ).delete( deleteUser );

// Route to /api/user/:userId/friends/:friendId
router.route( '/:id/friends/:friendId' ).post( addFriend ).delete( deleteFriend );

module.exports = router;