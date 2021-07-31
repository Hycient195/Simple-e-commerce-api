import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { signup, login, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js'

const router = express.Router()

// router.post('/signup', signup )

// router.post('/login', login)

// router.get('/users', getUsers)

// router.get('/users/:id', getUserById)

// router.put('/users/:id', updateUser)

// router.delete('/users/:id', deleteUser)


router
    .route('/')
    .get(protect, getUsers)

router
    .route('/signup')
    .post(signup)

router
    .route('/login')
    .post(login)

router
    .route('/:id')
    .get(protect, getUserById)
    .put(protect, updateUser)
    .delete(protect, deleteUser)

export default router
