const express= require('express')
const cors=require('cors')
const apiRouter = require('./routes');
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', apiRouter);



app.listen(port, () => {
    console.log(`Server is running on port ${port}! 😍`);
  });