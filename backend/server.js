const app = require('./app');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDatabase =require('./config/database')
const bodyParse = require('body-parser');

//
app.use(bodyParse.json({limit: '500mb'}));
app.use(morgan('common'))
//Setting up  config file
dotenv.config({path: 'backend/config/config.env'})

// CONNECT DATABASE
connectDatabase();

app.listen(8000,()=>{
    console.log(`Server start on PORT: 8000 in ${process.env.NODE_ENV} node`)
})