import 'dotenv/config';
import express from 'express';
import morgan from 'morgan'
import cors from 'cors';
import connectDB  from './config/dbconnect.js';
import router from './routes/index.route.js';
import cookieParser from 'cookie-parser';

// Create App
const app = express();
// Port Setup
const PORT = process.env.PORT || 3000;

//Handle JSON
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

//Handle Logger and CORS
app.use(morgan('dev'));
//WhiteListing
const corsOptions = {
    origin: "http://www.localhost:3000",
    methods: "OPTIONS, GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "x-origin"],
    credentials: true,  
    optionsSuccessStatus: 204,
}

app.use(cors('*'));
app.use(cookieParser());

//Testing Route
app.get("/",function(req, res){
    res.send(`<h1> Welcome Express's Home Page IBC.COM </h1>`);
});

//Routes Setup
app.use('/api', router);


app.listen(PORT,console.log(`Express listening on port ${PORT}`));
