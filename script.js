/*
--------------------------------------------------
TEMPORARY DATA
--------------------------------------------------

This data is temporary for testing the frontend.

When the backend (MERN stack) is ready, this
should be replaced with database/API calls.

Example in the future:
fetch("/api/users")
fetch("/api/garages")
fetch("/api/favorites")
--------------------------------------------------
*/

let users = [];
let favorites = [];
let parkingHistory = [];


/*
--------------------------------------------------
GARAGE CAPACITY DATA (TEMPORARY)

These numbers represent available spots.

Current rule for color:
50+ spots = green
20–49 spots = yellow
0–19 spots = red

*** TEAM NOTE ***
If the team wants different capacity rules,
change them in updateGarageColors().
--------------------------------------------------
*/

let garages = {
 garageA: 70,
 garageB: 30,
 garageC: 10,
 garageD: 5,
 garageH: 2,
 garageI: 0
};


/*
--------------------------------------------------
SCREEN SWITCHING
--------------------------------------------------
*/

function showScreen(screenId) {

 let screens = document.querySelectorAll(".screen");

 screens.forEach(function(screen) {
 screen.classList.remove("active");
 });

 document.getElementById(screenId).classList.add("active");
}


/*
--------------------------------------------------
LOGIN
--------------------------------------------------
*/

function login() {

 let username = document.getElementById("username").value;
 let password = document.getElementById("userPass").value;

 if(username === "" || password === ""){
 alert("Please enter username and password");
 return;
 }

 let foundUser = users.find(function(user){
 return user.username === username && user.password === password;
 });

 if(foundUser){
 showScreen("userDashboard");
 updateGarageColors();
 }
 else if(username === "admin"){
 showScreen("adminDashboard");
 }
 else{
 alert("Account not found. Please create an account first.");
 }
}


/*
--------------------------------------------------
CREATE USER
--------------------------------------------------
*/

function createUser() {

 let username = document.getElementById("createUsername").value;
 let password = document.getElementById("createPass").value;

 if(username === "" || password === "") {
 alert("Please fill in all fields");
 return;
 }

 users.push({
 username: username,
 password: password
 });

 alert("User created (temporary storage)");

 showScreen("loginScreen");
}


/*
--------------------------------------------------
GARAGE COLOR UPDATE
--------------------------------------------------
*/

function updateGarageColors() {

 for(let garage in garages) {

 let spots = garages[garage];
 let element = document.getElementById(garage);

 if(!element) continue;

 if(spots >= 50) {
 element.style.color = "green";
 }
 else if(spots >= 20) {
 element.style.color = "yellow";
 }
 else {
 element.style.color = "red";
 }

 }
}


/*
--------------------------------------------------
ADD FAVORITE
--------------------------------------------------
*/

function addFavorite(){

 let garage = document.getElementById("garageSelect").value;

 if(favorites.length >= 3){
 alert("You can only save 3 favorite garages.");
 return;
 }

 if(!favorites.includes(garage)){

 favorites.push(garage);

 updateFavoritesDisplay();

 alert(garage + " added to favorites");

 } else {

 alert("This garage is already in your favorites");

 }
}


/*
--------------------------------------------------
REMOVE FAVORITE
--------------------------------------------------
*/

function removeFavorite(){

 let garage = prompt("Enter garage name to remove (Example: Garage A)");

 favorites = favorites.filter(function(fav){
 return fav !== garage;
 });

 updateFavoritesDisplay();

}


/*
--------------------------------------------------
DISPLAY FAVORITES
--------------------------------------------------
*/

function updateFavoritesDisplay(){

 let favoritesSection = document.getElementById("favoritesList");

 if(!favoritesSection) return;

 favoritesSection.innerHTML = "";

 if(favorites.length === 0){
 favoritesSection.innerHTML = "<p>No favorite garages yet</p>";
 return;
 }

 favorites.forEach(function(garage){

 let item = document.createElement("p");
 item.textContent = garage;

 favoritesSection.appendChild(item);

 });

}


/*
--------------------------------------------------
PARKING HISTORY
--------------------------------------------------
*/

function saveUserRecord() {

 let garage = document.getElementById("garageSelect").value;
 let date = document.querySelector("input[type=date]").value;

 parkingHistory.push({
 garage: garage,
 date: date
 });

 alert("Record saved");
}


function updateUserRecord() {
 alert("Update record feature not implemented yet");
}


function deleteUserRecord() {

 parkingHistory.pop();

 alert("Last record deleted");
}


/*
--------------------------------------------------
ACCOUNT MANAGEMENT
--------------------------------------------------
*/

function updatePassword() {
 alert("Password update feature coming later");
}


function deleteUser() {
 alert("Delete user feature placeholder");
}