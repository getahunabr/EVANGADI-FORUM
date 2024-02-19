const dbConnection = require("../db/dbConfig");
const bcrypt=require("bcrypt")
const [statusCodes]=require("http statusCodes")
const jwt=require("jsonwebtoken")
async function register(res, req) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!email || !username || !password || !firstname || !lastname) {
    return res.status(statusCodes.badRequest).json({
      msg: "please provide all the required information!",
    });
  }
  try {
    const [user] = await dbConnection.query(
      "SELECT username,userid from users WHERE username=? or email=?,[username,email]"
      if(user.length>0){
        return res.status(statusCodes.badRequest).json({msg: "user already registered"})
      }
      if(password.length<= 8){
       return  res.status(statusCodes.badRequest).json({msg:"password must be atleast 8 character"})
      }
      //encrypt the password 
      const salt=await bcrypt.genSalt(10)
      const hashedPassword=bcrypt.hash(password,salt)
    );
    await dbConnection.query(
      "INSERT INTO users(username,firstname,lastname,email,password VALUES(?,?,?,?))",
      [username, firstname, lastname, email,hashedPassword ]
    );
    return res.status(statusCodes.created).json({ msg: "user created" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: "something went wrong, try again later " });
  }
}

async function login(res, req) {
  const [email,password]=req.body
  if(!email || !password){
    return res.status(statusCodes.badRequest).json({msg:"please enter the required field"})
  }
  try {
    const [user] = await dbConnection.query(
      "SELECT username,userid,password from users WHERE  email=?,[email]")
      if(user.length==0){
        return res.status(statusCodes.badRequest).json({msg:"Invalid credentials"})
      }else{
        res.json("user existed")
      }
      //compare password 
     const isMatch= await bcrypt.compare(password,user[0].password)
     if(!isMatch){
      return res.status(statusCodes.badRequest).json({msg:"Invalid credentials"})
     }
     const username=user[0].username
     const userid=user[0].userid
     const token=jwt.sign({username,userid},process.env.JWT_SECRET,(expiresIn:"id"))
     return res.status(statusCodes.ok).json({msg:"user login successful",token})
     return res.json({user})
  } catch (error) {
    
   res.status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later " });
  }
  res.send("login");
}

async function CheckUser(res, req) {
  const username=req.user.username
  const userid=req.user.userid
  res.status(statusCodes.ok).json({msg:"valid user",username,userid})
  res.send("CheckUser");
}

module.exports = { register, login, CheckUser };
