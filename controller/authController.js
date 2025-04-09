const User = require("../db/models/users");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const generateToken = (payload)=>{
    return jwt.sign(payload, process.env.JWTSECRETKEY, {expiresIn:process.env.JWTEXPIRESIN})
}

const adminSignup = async (req,res)=>{
    const body = req.body;

    await User.create({
        name:body.name,
        email:body.email,
        password:body.password,
        role:body.role
    })


    const result = User.json()

    result.token = generateToken({
        id: result.id,
      });

    if(result){
        return res.status(200).json({
            message:"User Created Successfully",
            data:result
        })}

}

const adminLogin = async (req,res)=>{
    const body = req.body;
    const user = await User.findOne({where:{email:body.email}})
    
    const ispasswordValid = await bcrypt.compare(body.password, user.password)
    if(!ispasswordValid){
        return res.status(401).json({
            message:"Invalid Password"
        })
    }

    const token = generateToken({
        id: result.id,
      });

      res.status(200).json({
        message:"Login Successful",
        token,
        data:user
      })
}









const googleLogin = async (req, res, next) => {
  try {
    const { id_token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        userName: name,
        email,
        password: "google-auth", // dummy password, not used
        userType: "customer",    // assign role here
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWTSECRETKEY, {
      expiresIn: process.env.JWTEXPIRESIN,
    });

    res.status(200).json({
      status: "success",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.userType,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Google authentication failed" });
  }
};

const logout = async (req, res) => {
  try {
    // Invalidate the token or perform any necessary logout actions

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Logout failed" });
  }
};  


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }


    const token = jwt.sign({ id: user.id }, process.env.JWTSECRETKEY, {
      expiresIn: JWTEXPIRESIN,
    });

  

    res.status(200).json({
      message: "Password reset token sent to email",
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Password reset failed" });
  }
}

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.password = newPassword; // Hash the password before saving
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Password reset failed" });
  }
};



module.exports = {adminSignup,adminLogin,googleLogin,googleLogin,forgotPassword,resetPassword,logout}