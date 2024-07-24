const User=require("../modal/userModal");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { redisClient } = require("../config/redis");
require("dotenv").config()

const register = async (req, res) => {
  try {
    let { email, password, role } = req.body;
    email = email.trim().toLowerCase();

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({  email, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const token=jwt.sign({userId:user.id,role:user.role},process.env.key );
      await redisClient.set("token",token,{EX:5*60})
      res.status(200).json({message:"Login successfull", token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  const updateUser = async (req, res) => {
    try {
        const loggedInUserId = req.userId; 
        const { id } = req.params;
        const { email, password, role } = req.body;

        if (parseInt(id) !== loggedInUserId) {
            return res.status(403).json({ error: 'Forbidden: You can only update your own account' });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.email = email || user.email;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        user.role = role || user.role;

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};



const deleteUser = async (req, res) => {
  try {
      const loggedInUserId = req.userId; 
      const { id } = req.params;
      if (parseInt(id) !== loggedInUserId) {
          return res.status(403).json({ error: 'Forbidden: You can only delete your own account' });
      }

      const user = await User.findByPk(id);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();
      res.status(200).json({ message: 'User has been deleted' });
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
};



  module.exports={register,login,updateUser,deleteUser}