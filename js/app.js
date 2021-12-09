import { navigateTo } from "./router.js";
let _users = [];
let _selectedUserId;
const _baseUrl = "https://api.jsonbin.io/v3/b/61b1ca5701558c731cd0f890";
const _headers = {
  "X-Master-Key":
    "$2b$10$T3XgiZeuMHH6lOvJetWSNOdSbY5UOGcIrSpCrknVN6fmSJt32gU4K",
  "Content-Type": "application/json",
};

// ========== READ ==========

/**
 * Fetchs person data from jsonbin
 */
async function loadUsers() {
  const url = _baseUrl + "/latest"; // make sure to get the latest version
  const response = await fetch(url, {
    headers: _headers,
  });
  const data = await response.json();
  console.log(data);
  _users = data.record;
  appendUsers(_users);
}
loadUsers();

/**
 * Appends users to the DOM
 * @param {Array} users
 */
function appendUsers(users) {
  let htmlTemplate = "";
  for (const user of users) {
    htmlTemplate += /*html*/ `
      <article>
        <h3>${user.name}</h3>
        <p><a href="mailto:${user.mail}">${user.mail}</a></p>
        <button onclick="selectUser(${user.id})">Update</button>
        <button onclick="deleteUser(${user.id})">Delete</button>
      </article>
      `;
  }
  document.querySelector("#grid-users").innerHTML = htmlTemplate;
  //showLoader(false);
}

// ========== CREATE ==========

/**
 * Creates a new user with properties: name, mail & id
 */
async function createUser() {

    console.log("Hey");
  // references to input fields
  let nameInput = document.querySelector("#name");
  let mailInput = document.querySelector("#mail");
  // dummy generated user id
  const userId = Date.now();
  // declaring a new user object
  const newUser = {
    name: nameInput.value,
    mail: mailInput.value,
    id: userId,
  };
  // pushing the new user object to the _users array
  _users.push(newUser);
  // wait for update
  await updateJSONBIN(_users);
  // reset
  nameInput.value = "";
  mailInput.value = "";
  //navigating back
  navigateTo("#/");
}

// ========== UPDATE ==========

/**
 * Finds a display selected user by given.
 * @param id
 */
function selectUser(id) {
  _selectedUserId = id;
  // find user by given user id
  const user = _users.find((user) => user.id == _selectedUserId);
  // references to the input fields
  let nameInput = document.querySelector("#name-update");
  let mailInput = document.querySelector("#mail-update");
  // set indout values with selected user values
  nameInput.value = user.name;
  mailInput.value = user.mail;
  navigateTo("#/update");
}

/**
 * Updates user with values from input fields
 */
async function updateUser() {
  showLoader(true);
  // references to input fields
  const nameInput = document.querySelector("#name-update");
  const mailInput = document.querySelector("#mail-update");
  // find user to update by given user id
  const userToUpdate = _users.find((user) => user.id === _selectedUserId);
  // update values of user in array
  userToUpdate.name = nameInput.value;
  userToUpdate.mail = mailInput.value;
  // wait for update
  await updateJSONBIN(_users);
  // reset
  nameInput.value = "";
  mailInput.value = "";
  //navigating back
  navigateTo("#/");
}

// ========== DELETE ==========
/**
 * Deletes user by given user id
 * @param id
 */
async function deleteUser(id) {
  _users = _users.filter((user) => user.id !== id);
  await updateJSONBIN(_users);
}

// ========== Services ==========
/**
 * Updates the data source on jsonbin with a given users arrays
 * @param {Array} users
 */
async function updateJSONBIN(users) {
  // put users array to jsonbin
  const response = await fetch(_baseUrl, {
    method: "PUT",
    headers: _headers,
    body: JSON.stringify(users),
  });
  // waiting for the result
  const result = await response.json(); // the new updated users array from jsonbin
  console.log(result);
  //updating the DOM with the new fetched users
  appendUsers(result.record);
}

// event listeners
document.querySelector("#createButton").onclick = () => createUser();
document.querySelector("#updatePage").onclick = () => updateUser();


async function login() {
  const username = document.querySelector("#login-username").value;
  const password = document.querySelector("#login-password").value;
  const loginObject = { username: username, password: password };
  console.log(loginObject);
  const response = await fetch(
    "http://localhost:3000/php-login-service/?action=login",
    {
      method: "POST",
      body: JSON.stringify(loginObject),
    }
  );

  const data = await response.json();
  console.log(data);
  if (data.authenticated) {
    console.log(data);
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
    "http://localhost:3000/php-login-service/?action=signup",
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

//kalder på selectUser fordi det her script er et module i htmlen
window.selectUser = (id) => selectUser(id);
window.deleteUser = (id) => deleteUser(id);