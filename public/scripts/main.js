const chatForm= document.getElementById("chat-form");
const chatMessages=document.querySelector(".chat-messages");
const roomName= document.getElementById("room-name");
const userList= document.getElementById("users");
const url="https://chat-app-igg9.onrender.com"
const urlParams= new URLSearchParams(window.location.search);
const username= urlParams.get('username');
const socket= io(`${url}`,{transports:["websocket"]});
socket.emit("joinRoom",({username}));
socket.on("message",(message)=>{
    outputMessage(message)
})

chatForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let message= e.target.elements.msg.value;
    message=message.trim();
    if(!message){
        return false;
    }
    socket.emit("chatMessage",message);
    e.target.elements.msg.vlaue="";
    e.target.elements.msg.focus();
})

socket.on("roomUsers",({room,users})=>{
    roomName.innerText= room;
    outputRoomUsers(users);
})

function outputRoomUsers(users){
    userList.innerHTML="";
    users.forEach(user=>{
        const li= document.createElement("li");
        li.innerText=user.username
        userList.appendChild(li);
    })
}

function outputMessage(message){
    const div= document.createElement("div");
    div.classList.add("message");

    const p= document.createElement("p");
    p.classList.add("meta");
    p.innerText= message.username;
    p.innerHTM+= `<span>${message.time}</span>`
    div.appendChild(p);
    const Text= document.createElement("p");
    Text.innerText= message.text;
    div.appendChild(Text);
    chatMessages.appendChild(div);
}