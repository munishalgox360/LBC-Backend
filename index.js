import 'dotenv/config';
import express from 'express';
import morgan from 'morgan'
import cors from 'cors';
import https from "https";
import connectDB  from './config/dbconnect.js';
import router from './routes/index.route.js';


// Load SSL certificates
const privateKey = fs.readFileSync('/etc/letsencrypt/live/kambojproperty.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/kambojproperty.com/fullchain.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/kambojproperty.com/chain.pem', 'utf8'); 

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

// Create App
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));


app.use(morgan('dev'));

const corsOptions = {
    origin: "http://www.localhost:3000",
    methods: "OPTIONS, GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "x-origin"],
    credentials: true,  
    optionsSuccessStatus: 204,
};

app.use(cors('*'));

//Testing Route
app.get("/",function(req, res){
    res.send(`<h1> Welcome Express's Home Page IBC.COM </h1>`);
});

//API's Endpoint
app.use('/api', router);


// Create HTTPS server
https.createServer(credentials, app).listen(PORT, () => {
    console.log(`Express HTTPS server listening on port ${PORT}`);
});
