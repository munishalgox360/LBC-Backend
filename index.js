import 'dotenv/config';
import express from 'express';
import morgan from 'morgan'
import cors from 'cors';
import connectDB  from './config/dbconnect.js';
import router from './routes/index.route.js';

// Create App
const app = express();
// Port Setup
const PORT = process.env.PORT || 3000;

//Handle JSON
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//Handle Logger and CORS
app.use(morgan('combined'));
app.use(cors('*'));

//Set Path
app.use("/uploads",express.static('uploads'));

//Testing Route
app.get("/",function(req,res){
    res.send(`<h1> Welcome Express's Home Page IBC.COM </h1>`);
});

//Routes Setup
app.use('/api',router);


app.listen(PORT,console.log(`Express listening on port ${PORT}`));
