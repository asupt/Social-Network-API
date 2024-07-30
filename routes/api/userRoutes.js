const router = require('express').Router();
const {
    getUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// /api/users 
router.route('/').get(getUsers).post(postUser);

// /api/users/:userId
router.route('/:userId')
.get(getUser)
.put(updateUser)
.delete(deleteUser);

// /api/users/:userId/:friendId
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;