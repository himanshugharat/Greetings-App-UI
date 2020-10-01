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

/**
 * @description: loads the greeting data from api and add in div
 * @returns: error if any
 */
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

/**
 * @description: load the greatings using the id of greeting
 * @param {number} element
 */
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

/**
 * @description: add the new greetigs to the api
 * @returns: error if any
 * @param {object} post
 */
function addpost(post) {
  post.preventDefault();
  let firstName = document.querySelector(".firstName").value;
  let lastName = document.querySelector(".lastName").value;
  let form = document.querySelector(".formPopup");
  let firstNameError = document.querySelector(".firstNameError");
  let lastNameError = document.querySelector(".lastNameError");
  if (!validFormInputs(firstName) || !validFormInputs(lastName)) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let firstNameMessage = [];
      let lastNameMessage = [];
      if (firstName.length < 3) {
        firstNameMessage.push("first name should be greater than 3 char");
      }
      if (!validFormInputs(firstName)) {
        firstNameMessage.push("first name should not contain number");
      }
      if (lastName.length < 3) {
        lastNameMessage.push("last name should be greater than 3 char");
      }
      if (!validFormInputs(lastName)) {
        lastNameMessage.push("last name should not contain number");
      }
      if (firstNameMessage.length > 0) firstNameError.innerHTML = firstNameMessage.join(", ");
      if (lastNameMessage.length > 0) lastNameError.innerHTML = lastNameMessage.join(", ");
    });
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
      .then((response) => {response.json(); alert("successful added")})
    .//  .then(()=>{alert("successful added")})
      .catch((err) => {
        return err;
      })
  closeForm();
    location.reload();
  }
}

/**
 * @description: delete the card from api using the id of card
 * @returns: error if any
 * @param: {number} elements
 */
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
/**
 * @description: edit the existing greeting in the api using id
 * @returns: error if any
 */
function editGreetings() {
  const cardId = document.querySelector(".card");
  let firstName = document.querySelector(".firstNameEdit").value;
  let lastName = document.querySelector(".lastNameEdit").value;
  let ids = document.getElementById("idCollect").innerHTML;
  let form = document.querySelector(".formPopups");
  let firstNameError = document.querySelector(".firstNameEror");
  let lastNameError = document.querySelector(".lastNameEror");
  ids = +ids + 1;
  if (!validFormInputs(firstName) || !validFormInputs(lastName)) {
    form.addEventListener("submit", (e) => {
      firstNameError.innerHTML=" "
      lastNameError.innerHTML=" "
      e.preventDefault();
      let firstNameMessage = [];
      let lastNameMessage = [];
      if (firstName.length < 3) {
        firstNameMessage.push("first name should be greater than 3 char");
      }
      if (!validFormInputs(firstName)) {
        firstNameMessage.push("first name should not contain number");
      }
      if (lastName.length < 3) {
        lastNameMessage.push("last name should be greater than 3 char");
      }
      if (!validFormInputs(lastName)) {
        lastNameMessage.push("last name should not contain number");
      }
      if (firstNameMessage.length > 0) firstNameError.innerHTML = firstNameMessage.join(", ");
      if (lastNameMessage.length > 0) lastNameError.innerHTML = lastNameMessage.join(", ");
    });
  } else {
    let cardValue = cardId.childNodes[ids].id;
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
      }).then((responseJon)=>{
        alert("successful updated")
      });
    closeEditForm();
    location.reload();
    //alert("succesfully edited");
  }
}

/**
 * @description: validate the name from form
 * @returns: true or false
 * @param:{string}name
 */
function validFormInputs(name) {
  return /^[a-zA-Z]{3,}$/.test(name);
}

/**
 * @description: use to display the edit form
 * @param:{object}element
 */
function openFormToEdit(element) {
  document.querySelector(".formPopups").style.display = "block";
  document.getElementById("idCollect").innerHTML = element.id;
  loadGreetingById(element.id);
}

//use to hide the edit form
function closeEditForm() {
  document.querySelector(".formPopups").style.display = "none";
  //  setTimeout(() => {
  //   alert("succesfully edited");
  //  }, 1000);
}

//use to display the add form
function openForm() {
  document.querySelector(".formPopup").style.display = "block";
}

//use to hide the add form
function closeForm() {
  document.querySelector(".formPopup").style.display = "none";
}

//use to load the data on submit
buttonAllcard.addEventListener("click", function () {
  card.innerHTML = "<h1>Basic pannel Layout</h1>";
  loadGreetings();
});

//use to add the data on submit
document.getElementById("addpost").addEventListener("submit", addpost);
//window.open("addpost").addEventListener("submit", addpost);

// $(#addpost).click(function(){

// })
