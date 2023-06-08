

const register_form= document.getElementById("register_form")
const URL="https://mock-10-6qkq.onrender.com";


const register=()=>{
    const payload={
        name:document.getElementById("Name").value,
        email: document.getElementById("Email").value,
        password:document.getElementById("Password").value,
    }
    fetch(`${URL}/user/register`,{
        method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(payload)
    }).then(res=> res.json())
    .then(res=> console.log(res),
      window.location.href="login.html"
    )
    .catch(err=> console.log(err))
}