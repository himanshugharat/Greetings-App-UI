const buttonAll = document.querySelector(".openAllButton");
const card = document.querySelector(".card");
function loadGreetings() {
  fetch("http://localhost:3000/greeting")
    .then((response) => response.json())
    .then((data) => {
      var place = 0;
      data.forEach((element) => {
        const div = document.createElement("div");
        div.id = element.id;
        div.innerHTML = `<div class="card-container">
        <p id="card-id">id:${element.id} <br>
        <b>Hello ${element.firstName} ${element.lastName}
        </b>(Greeting)<br>
        <b>${element.firstName}
        </b>(name)<br><br>
        15 min ago<br>
             <div><button id="${place}" class="card-button" onclick="deleteGreeting(this)"><strong>Delete</strong></button>
            <button id="${place}" class="card-button" onclick="openFormToEdit(this)"><strong>Edit</strong></button>
        </div></p></div>`;
        place += 1;
        card.appendChild(div);
      });
    });
}

function openFormToEdit(element) {
  document.getElementById("popupsForm").style.display = "block";
  document.getElementById("idCollect").innerHTML = element.id;
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
buttonAll.addEventListener("click", function () {
  card.innerHTML = "";
  loadGreetings();
});
document.getElementById("addpost").addEventListener("submit", addpost);

function addpost(post) {
  post.preventDefault();

  let firstname = document.getElementById("firstName").value;
  let lastname = document.getElementById("lastName").value;
  fetch("http://localhost:3000/greeting", {
    method: "POST",
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
    .then((data) => console.log(data));
  alert("succesfully added");
}
const cardid = document.querySelector(".card");
function deleteGreeting(element) {
  var id = element.id;
  let cardValue = cardid.childNodes[id].id;
  let url = "http://localhost:3000/greeting/" + cardValue;
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
  alert("succesfully deleted");
}
function editGreetings() {
  const cardid = document.querySelector(".card");
  let firstname = document.getElementById("firstNameedit").value;
  let lastname = document.getElementById("lastNameedit").value;
  let ids = document.getElementById("idCollect").innerHTML;
  let cardValue = cardid.childNodes[ids].id;
  alert(ids+lastname+firstname);
  let url = "http://localhost:3000/greeting/" + cardValue;
  fetch(url, {
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
    .then((data) => console.log(data)).catch(err=>console.log(err));
    
  alert("succesfully edited");
}

