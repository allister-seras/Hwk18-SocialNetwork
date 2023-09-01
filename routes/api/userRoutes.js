const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends
// router.route('/:userId/friends');

// /api/users/:userId/friends/:friendId
router.route('/:studentId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;