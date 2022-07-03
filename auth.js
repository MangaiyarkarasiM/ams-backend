const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const createJWT = async(payload)=>{
    var token = jwt.sign(payload,secret,{
        expiresIn:'2m'
    });
    return token;
}

const authVerify = async(token)=>{
    try{
        let payload = jwt.verify(token,secret);
        return true
    }
    catch(error)
    {
        return false
    }
}

const hashing = async(value)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(value,salt);
        return hash
    } catch (error) {
            return error
    }
}

const hashCompare = async(value,hash)=>{
    try {
        return await bcrypt.compare(value,hash);
    } catch (error) {
        return error
    }
}


module.exports={hashing,hashCompare,createJWT,authVerify}