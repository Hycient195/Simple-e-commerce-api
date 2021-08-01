import asyncHandler from 'express-async-handler'
import User from '../models/UserModel.js'
import createToken from '../utils/generateToken.js'
import generateToken from '../utils/generateToken.js'

/* Signup Handler */
// Route - POST /api/signup
const signup = asyncHandler(async(req, res)=>{
    const { firstName, lastName, email, password } = req.body

    /* Terminate the signup process if the user already exists */
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw Error('User already Exists')
    }

    /* Creating the user if the user does not exist */
    const user = await User.create({
        // All parameter are explicitly assigned for clarity sake
        firstName : firstName,
        lastName : lastName,
        email : email,
        password : password
    })

    /* Sending the parameters of the created user back to the frontEnd */
    if(user){
        res.status(200).json({
            _id : user._id,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            token : generateToken(user._id)
        })
        console.log('User signed up', generateToken(user._id))
    }
    /* If error is encountered in creating new user */
    else{
        res.status(400)
        throw Error('Unable to create new user')
    }
})

/* Login Handler */
// Route - POST /api/login
const login = asyncHandler(async(req, res)=>{
    const { firstName, lastName, email, password } = req.body

    const user = await User.login(email, password)

    if(user){
        res.status(200)
        res.json({
            _id : user._id,
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            token : createToken(user._id)
        })
        console.log('User logged in')
        console.log(user)
    }else{
        res.status(400)
        throw Error('Unable to login') 
    }


})

/* Fetching all users */
// Route - GET /api/users
const getUsers = asyncHandler(async(req, res)=>{
    const user = await User.find({})
    if(user){
        res.json(user)
        console.log('Users found')
    }else{
        res.status(404)
        throw new Error('Error occourd in fetching users')
    }
})

/* Fetching a single user by ID */
// Route - GET /api/users/:id
const getUserById = asyncHandler(async(req, res)=>{
    const userId = req.params.id
    const user =await User.findById(userId)

    if(user){
        res.json(user)
        console.log('User found')
    }else{
        res.status(404)
        throw new Error('Unable to fetch user')
    }
})

/* Updating an existing user */
// Route - PUT /api/users/:id
const updateUser = asyncHandler(async(req, res)=>{
    const userId = req.params.id
    const user = await User.findById(userId)

    if(user){
        user.firstName = req.body.firstName || user.firstName
        user.lastName = req.body.lastName || user.lastName 
        user.email = req.body.email || user.email

        const updatedUser = await user.save()
        // console.log(updatedUser)

        res.json({
            firstName : updatedUser.firstName,
            lastName : updatedUser.lastName,
            email : updatedUser.email,           
        })
        console.log('User updated')
    }else{
        res.status(400)
        throw new Error('Could not update user')
    }
})

/* Deleting a user */
// Route - DELETE /api/users/:id
const deleteUser = asyncHandler( async(req, res)=>{

    const userId = req.params.id
    const user = await User.findById(userId)
    const users = await User.find({})

    if(user){
        await User.findByIdAndDelete(userId)
        res.json({message : 'User deleted'})
        console.log('User deleted')
    }else{
        res.status(400)
        throw new Error('Unable to delete user')
    }
})


export { signup, login, getUsers, getUserById, updateUser, deleteUser }