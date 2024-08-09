import express from "express";
import userRoutes from './userRoutes/index.js';
import db from '../db/dbConnection.js';

const router = express.Router();

router.use('/users',userRoutes);

export default router;