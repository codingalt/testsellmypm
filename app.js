const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const cookieParser = require('cookie-parser')
const express = require('express');
const bodyParser = require("body-parser");
const UserModel = require('./Models/UserModel');
const cors = require('cors');
require('./conn');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path')

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cookieParser())
app.use(cors());

// Linking Router 
app.use(require('./Routes/UserRoute'));
app.use(require('./Routes/categoryRoute'));
app.use(require('./Routes/ChatRoute'));
app.use(require('./Routes/MessageRoute'));
app.use(require('./Routes/ListingRoute'));
app.use(require('./Routes/BuyerRequestsRoute'));
app.use(require('./Routes/ApprovedRequestsRoute'));
app.use(require('./Routes/PaymentRoute'));
app.use(require('./Routes/AdvisorRoute'));


const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
   }


app.listen(PORT,()=>{
    console.log(`Listeninig to the port ${PORT}`);
});