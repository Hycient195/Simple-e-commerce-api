import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : [true, 'First name field empty'],
    },
    lastName : {
        type : String,
        required : [true, 'Last name field is empty']
    },
    email : {
        type : String,
        required : [true, 'Email field in empty'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'Password field is empty'],
        minLength : [4, 'Password is less than 4 characters']
    }
},{timestamps : true})

/* Hashing user password before saving to the database */
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
})

/* Creating a login method for login in the controller */
UserSchema.statics.login  = async function(email, password){
    const user = await this.findOne({email})
    if(user){
        const auth = bcrypt.compare(password, this.password)
        
        if(auth){
            return user
        }else{
            throw Error('Incorrect Password')
        }
    }else{
        throw Error('Email does not exist')
    }
}

const User = mongoose.model('user', UserSchema)
export default User