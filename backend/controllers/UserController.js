const User=require('./../models/Users')
const register=async (req,res,next)=>{
    try{
        const newUser=await User.create(req.body);
        //console.log(newUser)
        return res.send("created succesfully")

    }catch(err){
        console.log(err)
    }

}
const getUsers=async (req,res,next)=>{
    try{
        const users=await User.find({})
        return res.send(users)
    }catch(err){
        console.log(err)
    }
}

module.exports.register=register;
module.exports.getUsers=getUsers;