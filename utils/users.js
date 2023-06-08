const users=[];
const userJoin=(id,username)=>{
    const user= {id,username};
    users.push(user);
    return user;
}

const getRoomUsers=(room)=>{
    return users.length
}

const getCurrentUser=(id)=>{
    return users.find(user=> user.id==id)
}

const userLeave=(id)=>{
    const index= users.findIndex(user=> user.id==id)

    if(index!=-1){
        return users.splice(index,1)[0];
    }
}

module.exports={userJoin,getRoomUsers,userLeave,getCurrentUser}