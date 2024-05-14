import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = Schema(
    {
    name: {
        type: String,
        required: [true, 'User name is required'],
        minLength: [6, 'Name should be equal or grater than 6 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is mendatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [5, 'Password must be equal or more than 5 characters']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please make sure to confirm your password'],
        validate: {
            validator: function(val) {
                return val === this.password
            },
            message: 'Passwords does not match'
        }
    },
    passwordChangedAt: Date,
    role: {
        required: [true, 'User role is necessary'],
        type: String,
        enum: ['user', 'admin']
    },
    avatar: String
}, {timestamps: true})


// Password encryption
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
    this.password =  await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined;
    next()
})

// To hide user password
// userSchema.pre(/^find/, function(next) {
//     this.find().select('-password')
//     next()
// })

// password validation if same
userSchema.methods.isPasswordCorrect = async function (candidatePassword, userPassword){
    return await bcrypt.compare(userPassword, candidatePassword)
}

userSchema.methods.checkForPasswordChangedAfterTokenIssue = function(JWTTimestamp) {
    if(this.passwordChangedAt){
        const updatedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000, 10)
        return JWTTimestamp < updatedTimeStamp
    }
    return false;
}

export const User = mongoose.model('User', userSchema)