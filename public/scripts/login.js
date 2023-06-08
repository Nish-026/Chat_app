const register_form= document.getElementById("register_form")
const URL="https://mock-10-6qkq.onrender.com";


const login=()=>{
    const payload={
        email: document.getElementById("Email").value,
        password:document.getElementById("Password").value,
    }
    fetch(`${URL}/user/login`,{
        method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(payload)
    }).then(res=> res.json())
    .then((res)=>{
        console.log(res);
        if(res.user){
            window.location.href="ChatHomepage.html"
        }else{
            alert("wrong credentials")
        }
    })
    .catch(err=> console.log(err))
}