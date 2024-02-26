import 'dotenv/config';
import express from 'express';
import morgan from 'morgan'
import cors from 'cors';
import connectDB  from './config/dbconnect.js';
import router from './routes/index.route.js';


connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

//Handle JSON
app.use(express.json());
app.use(express.urlencoded({extended : true}));


//Handle Logger and CORS
app.use(morgan('dev'));
app.use(cors('*'));

//Set Path
app.use("/uploads",express.static('uploads'));


//Testing Routes
app.get("/",function(req,res){
    res.send(`<h1> Welcome Express's Home Page IBC.COM</h1>`);
});


//Routes
app.use('/api',router);


app.listen(PORT,console.log(`Express listening on port ${PORT}`));
