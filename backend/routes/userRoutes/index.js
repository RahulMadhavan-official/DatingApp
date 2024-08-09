import express from 'express';
import bcrypt from 'bcrypt';
import User from '../../db/models/userSchema.js';
import mongoose from '../../db/dbConnection.js';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER } from '../../config.js';
import { sendOtp } from '../../middleware/twilioService.js';
import dotenv from 'dotenv';
import twilio from "twilio";
import jwt from "jsonwebtoken"
import { nanoid } from 'nanoid';



let saltVal=10
let tempData=new Map()
const accountSid = 'ACcbf0a874d2f0b8da811a0ce06419be28'
const authToken = '62b04bf4ea3246a57d21069f2ff1b89b'
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


const router = express.Router();


router.post('/login', async (req,res) =>{
    const body =req.body;
    try{
        const user= await User.findOne({contact: body.contact})
        if(!user){
            return res.status(403).json({message:"User not exist. Register as new user to continue"})
        }
        
        const isMatching = await bcrypt.compare(body.password,user.password)
        if(!isMatching){
         return res.status(403).json({message : 'contact or password incorrect'})
        }
        const token=jwt.sign({userId:user._id, role : 'USER'},
        "asdfghjklmnbvcxzqwertyuiop",{expiresIn:'7d'})
        res.status(200).json({message:'Sign-in successful',token})
    }
    catch(err){
        res.status(500).json({ message: 'Error signing in', error: err.message });
    }
    
})
router.post('/signup', async (req,res)=>{
    const body = req.body;
    let OTP =' ';
    const existingUser = await User.findOne({email:body.email,contact: body.contact});
    if(existingUser){
        res.status(201).json({message : "user already exisit...!"})
    }
    if(body.password !=  body.confirmPassword){
        return res.status(400).json({message : 'password doesnot match'})
       }
  
   
   let digits = '0123456789';
   
   for( let i=0; i<4 ; i++){
    OTP += digits[Math.floor(Math.random() * 10)]
   }
  await sendOtp(body.contact,OTP);
  const hashedPassword = await bcrypt.hash(body.password,10);
  body.password = hashedPassword;
  const user = await User.create(body);
   res.status(201).json({messaage : ' otp send successfully',user})
});
router.get('/find/:id',async(req,res)=>{
 const {id} = req.params;
 const userById = await User.findById(id);
 res.status(201).json(userById);
})
export default router;