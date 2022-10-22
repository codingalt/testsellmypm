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

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cookieParser())
app.use(cors());

app.get('/',(req,res)=>{
    res.json("Server started");
})

// const __dirname1 = path.resolve();
// console.log(__dirname1);
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname1, "client/build")));

//     app.get('*', (req,res)=>{
//         res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
//     });
// }else{
//     app.get('/',(req,res)=>{
//         res.json("Server started");
//     })
// }

// app.use("/uploads", express.static("./uploads"));

// Linking Router 
app.use(require('./Routes/UserRoute'));
app.use(require('./Routes/categoryRoute'));
app.use(require('./Routes/ChatRoute'));
app.use(require('./Routes/MessageRoute'));
app.use(require('./Routes/ListingRoute'));
app.use(require('./Routes/BuyerRequestsRoute'));
app.use(require('./Routes/ApprovedRequestsRoute'));
app.use(require('./Routes/PaymentRoute'));

app.listen(PORT,()=>{
    console.log(`Listeninig to the port ${PORT}`);
});

// const socketPort = process.env.SOCKET_PORT || 8800;

// // socket io code 
// const io = require('socket.io')(socketPort, {
//     cors: {
//         origin: 'http://localhost:3000'
//     }
// });

// let activeUsers = []

// io.on('connection', (socket)=>{
//     // add new user 
//     socket.on('new-user-add', (newUserId)=>{
//         // if user is not added previously        
//         if(!activeUsers.some((user)=> user.userId === newUserId))
//         {
//             activeUsers.push({
//                 userId: newUserId,
//                 socketId: socket.id
//             })
//         }
    

//         // console.log('Connected Users', activeUsers);
//         io.emit('get-users', activeUsers)
//     })

//     // Send Message
//     socket.on('send-message', (data)=>{
//         const {receiverId} = data;
//         const user = activeUsers.find((user)=> user.userId === receiverId);
//         if(user){
//             io.to(user.socketId).emit('receive-message', data)
//         }
//     })

//     socket.on('disconnect', ()=>{
//         activeUsers = activeUsers.filter((user)=> user.socketId !== socket.id)
//         io.emit('get-users', activeUsers)
//     })
// })