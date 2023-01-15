const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const express = require("express");
const bodyParser = require("body-parser");
const UserModel = require("./Models/UserModel");
const cors = require("cors");
require("./conn");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const http = require('http')
const server = http.createServer(app)
const {Server} = require("socket.io");
const io = new Server(server);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: true, 
  credentials: true, 
};

app.use(cors(corsOptions));

// Linking Router
app.use(require("./Routes/UserRoute"));
app.use(require("./Routes/categoryRoute"));
app.use(require("./Routes/ChatRoute"));
app.use(require("./Routes/MessageRoute"));
app.use(require("./Routes/ListingRoute"));
app.use(require("./Routes/BuyerRequestsRoute"));
app.use(require("./Routes/ApprovedRequestsRoute"));
app.use(require("./Routes/PaymentRoute"));
app.use(require("./Routes/AdvisorRoute"));
app.use(require("./Routes/ListingControlRoute"));

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {});


// Socketio Code Starts 
let activeUsers = [];

io.on("connection", (socket) => {
  // add new user
  console.log('connection is ready');
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    io.emit("get-users", activeUsers);
  });

  // Send Message
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-users", activeUsers);
  });
});

