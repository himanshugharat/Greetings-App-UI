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
card.innerHTML = "";
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
        <div id="card-id">id:${element.id} </div>
        <div id="name"><b>Hello ${element.firstName}
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

function openFormToEdit(element) {
  console.log(card.childNodes[element.id]);
  document.getElementById("popupsForm").style.display = "block";
  document
    .getElementById("firstNameedit")
    .setAttribute("value", card.childNodes[element.id]);
  document.getElementById("idCollect").id = element.id;
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
  card.innerHTML = "";
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
  var id = element.id;
  let cardValue = cardid.childNodes[id].id;
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
  let firstname = document.getElementById("firstNameedit").value;
  let lastname = document.getElementById("lastNameedit").value;
  let ids = document.getElementById("idCollect").id;
  let cardValue = cardid.childNodes[ids].id;
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
