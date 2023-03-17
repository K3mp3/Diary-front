let userList = document.querySelector(".userList");
let newUser = document.querySelector(".newUser");
let newUserPassword = document.querySelector(".newUserPassword");
let saveUserBtn = document.querySelector(".saveUserBtn");
let loginUsername = document.querySelector(".loginUsername");
let loginPassword = document.querySelector(".loginPassword");
let loginUserBtn = document.querySelector(".loginUserBtn");
let userGreeting = document.querySelector(".userGreeting");

fetch("http://localhost:3000/users")
.then(res => res.json())
.then(data => {
    console.log(data);
});

let loggedinUser = localStorage.getItem("username");
if(loggedinUser) {
    userGreeting.innerText = `Good morning ${loggedinUser}`;
}

saveUserBtn.addEventListener("click", () => {

    //SKAPA EN NY ANVÄNDARE
    let user = {username: newUser.value, password: newUserPassword.value};

    //SKICKA TILL SERVERN
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        
    });
    newUser.innerHTML = "";
    newUserPassword.innerHTML = "";
})

loginUserBtn.addEventListener("click", () => {

    let loginUser = {
        username: loginUsername.value,
        password: loginPassword.value 
    };

    fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser)
    })
    .then(res => res.json())
    .then(result => {
        if (result) {
            console.log(result);
            userGreeting.innerText = `Good morning ${result.username}`;
            localStorage.setItem("username", result.username);
            localStorage.setItem("id", result.id);
        } else {
            userGreeting.innerText = "Failed login attempt, please check your username and password!"
        }
    })

    loginUsername.innerHTML = "";
    loginPassword.innerHTML = "";
})