import { navigateTo } from "./router.js";
let _users = [];
let _selectedUserId;
const _baseUrl = "https://api.jsonbin.io/v3/b/61b3150e0ddbee6f8b1aa830";
const _headers = {
"X-Master-Key":
"$2b$10$HvdH7Du06WMNs0sAgZlD7eB03KvfEjNrT8uiRAPd7KC5vHmDCB8y.",
"Content-Type": "application/json",
};


// ========== READ ==========
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
        <img src="${user.avatarImg}">
        <h3>${user.businessName}</h3>
        <p>${user.title}</p>
        <p>${user.pickupDate} ${user.pickupTime}</p>
        <h2>${user.price}</h2>
        <button onclick="selectUser(${user.id})" >Update</button>
        <button onclick="deleteUser(${user.id})"class="deleteButton">Delete</button>
      </article>
      `;
  }
  document.querySelector("#grid-users").innerHTML = htmlTemplate;
  //showLoader(false);
}

// ========== CREATE ==========

/**
 * Creates a new user with properties: avatarImg, title, businessName, category ...
 */
async function createUser() {
  console.log("Hey");
  // references to input fields
  let avatarImgInput = document.querySelector("#avatarImg");
  let titleInput = document.querySelector("#title");
  let businessNameInput = document.querySelector("#businessName");
  let categoryInput = document.querySelector("#category");
  let productDesInput = document.querySelector("#productDes");
  let priceInput = document.querySelector("#price");
  let pickupDateInput = document.querySelector("#pickupDate");
  let pickupTimeInput = document.querySelector("#pickupTime");
  // dummy generated user id
  const userId = Date.now();
  // declaring a new user object
  const newUser = {
    avatarImg: avatarImgInput.value,
    title: titleInput.value,
    businessName: businessNameInput.value,
    category: categoryInput.value,
    productDes: productDesInput.value,
    price: priceInput.value,
    pickupDate: pickupDateInput.value,
    pickupTime: pickupTimeInput.value,
    id: userId,
  };
  // pushing the new user object to the _users array
  _users.push(newUser);
  // wait for update
  await updateJSONBIN(_users);
  // reset
  avatarImgInput.value = "";
  titleInput.value = "";
  businessNameInput.value = "";
  categoryInput.value = "";
  productDesInput.value = "";
  priceInput.value = "";
  pickupDateInput.value = "";
  pickupTimeInput.value = "";
  //navigating back
  navigateTo("#/product");
}


function showDetailView(id) {
  const userObject = _users.find(user => user.id == id);
  document.querySelector("#detailView h2").innerHTML = userObject.name;
  document.querySelector("#detailViewContainer").innerHTML = /*html*/`
      <img src="${userObject.avatarUrl}" onclick="showDetailView('${userObject.id}')">
      `;
    navigateTo("detailView");
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
  let avatarImgInput = document.querySelector("#avatarImg-update");
  let titleInput = document.querySelector("#title-update");
  let businessNameInput = document.querySelector("#businessName-update");
  let categoryInput = document.querySelector("#category-update");
  let productDesInput = document.querySelector("#productDes-update");
  let priceInput = document.querySelector("#price-update");
  let pickupDateInput = document.querySelector("#pickupDate-update");
  let pickupTimeInput = document.querySelector("#pickupTime-update");
  // set indout values with selected user value
 
  //avatarImgInput.value = user.avatarImg;
  titleInput.value = user.title;
  businessNameInput.value = user.businessName;
  categoryInput.value = user.category;
  productDesInput.value = user.productDes;
  priceInput.value = user.price;
  pickupDateInput.value = user.pickupDate;
  pickupTimeInput.value = user.pickupTime;
  navigateTo("#/update");
}

/**
 * Updates user with values from input fields
 */
async function updateUser() {
  
  // references to input fields
  const avatarImgInput = document.querySelector("#avatarImg-update");
  const titleInput = document.querySelector("#title-update");
  const businessNameInput = document.querySelector("#businessName-update");
  const categoryInput = document.querySelector("#category-update");
  const productDesInput = document.querySelector("#productDes-update");
  const priceInput = document.querySelector("#price-update");
  const pickupDateInput = document.querySelector("#pickupDate-update");
  const pickupTimeInput = document.querySelector("#pickupTime-update");
  // find user to update by given user id
  const userToUpdate = _users.find((user) => user.id === _selectedUserId);
  // update values of user in array
  userToUpdate.avatarImg = avatarImgInput.value;
  userToUpdate.title = titleInput.value;
  userToUpdate.businessName = businessNameInput.value;
  userToUpdate.category = categoryInput.value;
  userToUpdate.productDes = productDesInput.value;
  userToUpdate.price = priceInput.value;
  userToUpdate.pickupDate = pickupDateInput.value;
  userToUpdate.pickupTime = pickupTimeInput.value;
  // wait for update
  await updateJSONBIN(_users);
  // reset
  avatarImgInput.value = "";
  titleInput.value = "";
  businessNameInput.value = "";
  categoryInput.value = "";
  productDesInput.value = "";
  priceInput.value = "";
  pickupDateInput.value = "";
  pickupTimeInput.value = "";
  //navigating back
  navigateTo("#/update");
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
document.querySelector("#btnUpdate").onclick = () => updateUser();

//kalder på selectUser fordi det her script er et module i htmlen
window.selectUser = (id) => selectUser(id);
window.deleteUser = (id) => deleteUser(id);
