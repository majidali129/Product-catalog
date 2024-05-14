import express from 'express'
import { login, registerUser } from '../controllers/auth.controller.js';
import {getAllUsers, getUser, getMe, updateUser, updateMe, deleteUser } from '../controllers/user.controller.js';
import { protectRoute } from '../middlewares/protectRoute.js';


const router = express.Router();


router.post('/registerUser', registerUser);
router.post('/login', login)

router.use(protectRoute)
// for user
router.get('/me', getMe, getUser);
router.patch('/updateMe', updateMe)


// for admin
router.route('/').get(getAllUsers)
router.route('/:id').get(getUser).patch(updateUser)
.delete(deleteUser);




export default router;