const yup  = require("yup")

const userSignUpSchema = yup.object({
    username: yup.string().trim().required('Username is required').min(3, 'Name must be at least 3 characters long').max(25, 'Name must be at most 25 characters long'),
    useremail: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
})

const verifyUserSchema = yup.object({
    token: yup.string().trim().required("Token is required and must be a valid string")
})


const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);
const isValidUsername = (value) => /^[a-zA-Z0-9_]+$/.test(value);

const loginUserSchema = yup.object({
    identifier: yup.string().trim().required('Username or email is required').test('is-valid-identifier', 'Invalid username or email format', (value) => {
        return isValidEmail(value) || isValidUsername(value);
    }),
    password: yup.string().trim().required('Password is required').min(6, 'Password must be at least 6 characters long'),
}) 

const resetPasswordSchema = yup.object({
    newPassword: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
})

const updateProfileSchema = yup.object({
    username: yup.string().trim().min(3, 'Name must be at least 3 characters long').max(25, 'Name must be at most 25 characters long'),
    useremail: yup.string().email('Invalid email format')
})


module.exports = {userSignUpSchema, verifyUserSchema, loginUserSchema, resetPasswordSchema, updateProfileSchema}

