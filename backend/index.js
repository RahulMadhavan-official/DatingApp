import cors from 'cors';
import express from 'express';
import routes from './routes/index.js';
import db from './db/dbConnection.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes)


app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route Not Found' });
  });
app.listen(3000,()=>{
    console.log("server running...");
});