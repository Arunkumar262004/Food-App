import jwt from 'jsonwebtoken';

const authMiddlewear = async(req,res,next) =>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorised Login  "})
    }

    try{
        const tokendecode =jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = tokendecode.id;
        next();
    }catch (error){
        console.log(error);
        return res.json({success:false,message:"Token Expired Login Again"})

    }
}


export default authMiddlewear;