/**
 *Purpose  : To carry out the fetch operations from api
 *@files   : app.js
 *@overview: API get,put,post,delete opreations
 *@author  : Himanshu Gharat
 *@verson  : 1.0
 *@since   : 22-09-2020
 */

url = "http://localhost:3000/greeting/";
const buttonAllcard = document.querySelector(".openAllButton");
const card = document.querySelector(".card");
card.innerHTML = "<h1>Basic pannel Layout</h1>";
loadGreetings();

function loadGreetings() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let place = 0;
      data.forEach((element) => {
        const div = document.createElement("div");
        div.id = element.id;
        div.innerHTML = `<div class="card-container">
        <div>id:${element.id} </div>
        <div><b>Hello ${element.firstName}
        </b>(Greeting)</div>
        <div><b>${element.lastName}
        </b>(name)</div>
        <div><a class="time">15 min ago<a></div>
            <div> <span><button id="${place}" class="card-button" onclick="deleteGreeting(this)"><img src="./images/trash-can.png"></button></span>
          <span> <button id="${place}" class="card-button" onclick="openFormToEdit(this)"><img src="./images/square-edit-outline.png"></button>
        </span></div></div>`;
        place += 1;
        card.appendChild(div);
      });
    })
    .catch((err) => {
      return err;
    });
}

function loadGreetingById(element){
  const cardid = document.querySelector(".card");
  let ids = +element+1;
  let IdUrl=url+ids
  fetch(IdUrl)
  .then((response) => response.json())
  .then((data)=>{
    document
       .getElementById("firstNameEdit")
       .setAttribute("value", data.msg.firstName);
    document
       .getElementById("lastNameEdit")
       .setAttribute("value", data.msg.lastName);
  })
}


function openFormToEdit(element) {
  document.getElementById("popupsForm").style.display = "block";
  document.getElementById("idCollect").innerHTML = element.id;
  loadGreetingById(element.id)
}

function closeEditForm() {
  document.getElementById("popupsForm").style.display = "none";
}

function openForm() {
  document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

buttonAllcard.addEventListener("click", function () {
  card.innerHTML = "<h1>Basic pannel Layout</h1>";
  loadGreetings();
});

document.getElementById("addpost").addEventListener("submit", addpost);

function addpost(post) {
  post.preventDefault();
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
    }),
  })
    .then((response) => response.json())
    .catch((err) => {
      return err;
    });
  alert("succesfully added");
  location.reload();
}

const cardid = document.querySelector(".card");
function deleteGreeting(element) {
  var ids = +element.id+1;
  console.log(ids)
  let cardValue = cardid.childNodes[ids].id;
  let deleteURL = url + cardValue;
  console.log(deleteURL);
  fetch(deleteURL, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch((err) => {
      return err;
    });
  alert("succesfully deleted");
  location.reload();
}

function editGreetings() {
  const cardid = document.querySelector(".card");
  let firstname = document.getElementById("firstNameEdit").value;
  let lastname = document.getElementById("lastNameEdit").value;
  let ids = document.getElementById("idCollect").innerHTML;
  ids=+ids+1
  let cardValue = cardid.childNodes[ids].id;
  console.log(cardValue)
  let editURL = url + cardValue;
  fetch(editURL, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstname,
      lastName: lastname,
    }),
  })
    .then((response) => response.json())
    .catch((err) => {
      return err;
    });
  alert("succesfully edited");
  location.reload();
}
function valid(firstName,lastName){
  
  return /^[a-zA-Z]+$/.test(lastName);/^[a-zA-Z]+$/.test(firstName);
}
console.log(valid("himanshu","Gharat"))