const router = require("express").Router();
const { signup, users, getUserByID, updateUser, deleteUser, login, userTemplate } = require("../controllers/userAuthController.js");
const { verifyJWT } = require("../middleware/auth.middleware.js");

router.route('/').get(verifyJWT, users);
router.route('/template').get(verifyJWT, userTemplate);
router.route('/:id').get(verifyJWT, getUserByID);
router.route('/update').patch(verifyJWT, updateUser);
router.route('/delete').delete(verifyJWT, deleteUser);
router.route('/signup').post(signup);
router.route('/login').post(login);

module.exports = router