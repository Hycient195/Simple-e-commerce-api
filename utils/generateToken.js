import jwt from 'jsonwebtoken'

const createToken = (id) =>{
    const token = jwt.sign({id}, process.env.TOKEN_SECRET_STRING,{
        expiresIn : '3d'
    })
    return token
}

export default createToken