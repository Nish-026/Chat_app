const express= require('express');
const app= express();
const path=require("path");
const socketio= require("socket.io")
const http= require("http");
const formatMessage= require("./utils/message")
const {userJoin,getRoomUsers,userLeave,getCurrentUser}= require("./utils/users")
const server= http.createServer(app);
const io= socketio(server,{
    cors:{
        origin:"*"
    }
});
require("dotenv").config()
app.use(express.static(path.join(__dirname,'public')))

io.on("connection",(socket)=>{
    console.log("one user has joined")

    
    socket.on("joinRoom",({username})=>{
        const user= userJoin(socket.id,username);
        console.log(user);
        let room="main"
        socket.join(room)
        socket.emit("message", formatMessage("Chat Application","Welcome to our application"));
        socket.emit("message", formatMessage("Chat Application",`${username} has joined the chat`));
        // io.to(room).emit("roomusers",{
        //     room:user.room,
        //     users:getRoomUsers(user.room)
        // })
    })


    
    socket.on("chatMessage",(msg)=>{
        const user= getCurrentUser(socket.id);
        io.emit("message",formatMessage(user.username,msg));
    
    })

    socket.on("disconnect",()=>{
        const user= userLeave(socket.id);
        console.log("one user left");
        io.emit("message",formatMessage("Chat Application",`${user.username} has left the chat`))
    
        io.emit("roomUsers",{
            room:user.room,
            users:getRoomUsers()
        })
    })
})





server.listen(process.env.PORT,()=>{
    console.log("server is running")
})