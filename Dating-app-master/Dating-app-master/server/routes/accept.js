const mongoose=require('mongoose')
const router=require('express').Router()
const RequestModel=require("../models/requestModel")
const authenticateToken = require("../middleware/authenticeToken");

router.get('/sender-accept-list',authenticateToken, async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
  
  try {
    const acceptedRequest = await RequestModel.aggregate([
      {
        $match: { sender: userId ,status:"accepted"} 
      },
      {
        $lookup: {
          from: 'profiles', 
          localField: 'receiver', 
          foreignField: 'user', 
          as: 'profile'
        }
      },
      {
        $unwind: '$profile' 
      },
      {
        $lookup: {
          from: 'users', 
          localField: 'receiver', 
          foreignField: '_id', 
          as: 'user' 
        }
      },
      {
        $unwind: '$user' 
      },
      {
        $project: {
          _id: '$profile.user', 
          firstName: '$user.first_name', 
          lastName: '$user.last_name', 
          profileImage: '$profile.profileImage' 
        }
      }
    ]);
      res.status(200).json(acceptedRequest)
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  router.get('/receiver-accept-list',authenticateToken, async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
  
  try {
    const acceptedRequest = await RequestModel.aggregate([
      {
        $match: { receiver: userId ,status:"accepted"} 
      },
      {
        $lookup: {
          from: 'profiles', 
          localField: 'sender', 
          foreignField: 'user', 
          as: 'profile'
        }
      },
      {
        $unwind: '$profile' 
      },
      {
        $lookup: {
          from: 'users', 
          localField: 'sender', 
          foreignField: '_id', 
          as: 'user' 
        }
      },
      {
        $unwind: '$user' 
      },
      {
        $project: {
          _id: '$profile.user', 
          firstName: '$user.first_name', 
          lastName: '$user.last_name', 
          profileImage: '$profile.profileImage' 
        }
      }
    ]);
      res.status(200).json(acceptedRequest)
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
 module.exports=router