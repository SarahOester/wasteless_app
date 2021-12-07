import { navigateTo } from "./router.js";
console.log("app.js is running!");

async function login() {
  const username = document.querySelector("#login-username").value;
  const password = document.querySelector("#login-password").value;
  const loginObject = { username: username, password: password };
  console.log(loginObject);
  const response = await fetch(
    "http://localhost:3000/wasteless/php-login-service/?action=login",
    {
      method: "POST",
      body: JSON.stringify(loginObject),
    }
  );

  const data = await response.json();
  console.log(data);
  if (data.authenticated) {
    localStorage.setItem("userIsAuthenticated", true);
    localStorage.setItem("authUser", JSON.stringify(data.userData));
    resetMessage();
    navigateTo("#/");
  } else {
    document.querySelector(".login-message").innerHTML = data.error;
  }
}

function logout() {
  //reset localStorage
  localStorage.removeItem("userIsAuthenticated");
  localStorage.removeItem("authUser");
  //navigate to login
  navigateTo("#/login");
}

async function signup() {
  const businessName = document.querySelector("#signup-businessName").value;
  const adress = document.querySelector("#signup-adress").value;
  const zipcode = document.querySelector("#signup-zipcode").value;
  const username = document.querySelector("#signup-username").value;
  const password = document.querySelector("#signup-password").value;
  const passwordCheck = document.querySelector("#signup-password-check").value;

  const user = {
    businessName,
    adress,
    zipcode,
    username,
    password,
    passwordCheck,
  };
  console.log(user);

  const response = await fetch(
    "http://localhost:3000/wasteless/php-login-service/?action=signup",
    {
      method: "POST",
      body: JSON.stringify(user),
    }
  );

  const data = await response.json();
  console.log(data);
  if (data.signupSuccess) {
    resetMessage();
    navigateTo("#/login");
  } else {
    document.querySelector(".signup-message").innerHTML = data.error;
  }
}

function resetMessage() {
  document.querySelector(".signup-message").innerHTML = "";
  document.querySelector(".login-message").innerHTML = "";
}

// event listeners
document.querySelector("#btn-login").onclick = () => login();
document.querySelector("#btn-logout").onclick = () => logout();
document.querySelector("#btn-signup").onclick = () => signup();
