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
        <div class="time">15 min ago</div>
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

function loadGreetingById(element) {
  let ids = +element + 1;
  let IdUrl = url + ids;
  fetch(IdUrl)
    .then((response) => response.json())
    .then((data) => {
      document
        .querySelector(".firstNameEdit")
        .setAttribute("value", data.msg.firstName);
      document
        .querySelector(".lastNameEdit")
        .setAttribute("value", data.msg.lastName);
    });
}
function addpost(post) {
  post.preventDefault();
  let firstName = document.querySelector(".firstName").value;
  let lastName = document.querySelector(".lastName").value;
  let form=document.querySelector(".formPopup")
  let error=document.querySelector(".errors")
  if (!validFormInputs(firstName) || !validFormInputs(lastName)) {
    form.addEventListener('submit',(e)=>{
      e.preventDefault()
      let message=[]
      if(firstName.length<3){
        message.push("name should be greater than 3 char")
      }
      if(!validFormInputs(firstName) || !validFormInputs(lastName)){
        message.push("name should not contain number")
      }
      if(message.length>0)
      error.innerHTML=message.join(', ')
    })
  } else {
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
}}

const cardid = document.querySelector(".card");
function deleteGreeting(element) {
  var ids = +element.id + 1;
  let cardValue = cardid.childNodes[ids].id;
  let deleteURL = url + cardValue;
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
  const cardId = document.querySelector(".card");
  let firstName = document.querySelector(".firstNameEdit").value;
  let lastName = document.querySelector(".lastNameEdit").value;
  let ids = document.getElementById("idCollect").innerHTML;
  let form=document.querySelector(".formPopups")
  let error=document.querySelector(".error")
  ids = +ids + 1;
  if (!validFormInputs(firstName) || !validFormInputs(lastName)) {
    form.addEventListener('submit',(e)=>{
      e.preventDefault()
      let message=[]
      if(firstName.length<3){
        message.push("name should be greater than 3 char")
      }
      if(!validFormInputs(firstName) || !validFormInputs(lastName)){
        message.push("name should not contain number")
      }
      if(message.length>0)
      error.innerHTML=message.join(', ')
    })
  } else {
    let cardValue = cardId.childNodes[ids].id;
    console.log(cardValue);
    let editURL = url + cardValue;
    fetch(editURL, {
      method: "PUT",
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
      form.addEventListener('submit',(e)=>{
      //form.closeEditForm()
      //alert("succesfully edited");
      form.closeEditForm()
      //location.reload();
  })
 // alert("succesfully edited");
}
alert("succesfully edited");
}
function validFormInputs(name) {
  return /^[a-zA-Z]{3,}$/.test(name);
}
function openFormToEdit(element) {
  document.querySelector(".formPopups").style.display = "block";
  document.getElementById("idCollect").innerHTML = element.id;
  loadGreetingById(element.id);
}

function closeEditForm() {
  document.querySelector(".formPopups").style.display = "none";
  
}

function openForm() {
  document.querySelector(".formPopup").style.display = "block";
}

function closeForm() {
  document.querySelector(".formPopup").style.display = "none";
}

buttonAllcard.addEventListener("click", function () {
  card.innerHTML = "<h1>Basic pannel Layout</h1>";
  loadGreetings();
});

document.getElementById("addpost").addEventListener("submit", addpost);
