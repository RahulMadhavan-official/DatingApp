const connectDB = require('./models/db');
require('dotenv').config({path:'./.env'}); 
connectDB();
const app=require('./routes/index')

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});