//to show the links list in medium and small screens
let listIcon = document.querySelector("#menu-icon");
let dashboard = document.querySelector(".dashboard-container");
listIcon.addEventListener("click", () => {
  dashboard.classList.toggle("activeList");
});
//function to add user to page
document.addEventListener("DOMContentLoaded", function () {
  // Function to add user to the table
  function addUser(name, email, phone, state) {
    const tableBody = document.querySelector(".content tbody");
    const newUser = document.createElement("tr");
    newUser.innerHTML = `
      <td class="name">${name}</td>
      <td class="email">${email}</td>
      <td class="phone">${phone}</td>
      <td class="state">${state}</td>
      <td class="edit">edit</td>
      `;
    tableBody.appendChild(newUser);
  }
  // Fetch user data from backend and populate the table
  fetch("/admin/customer/api")
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let data = await response.json();
      return data;
    })
    .then((data) => {
      data.users.forEach((user) => {
        addUser(user.name, user.phone, user.email, user.status);
      });
    })
    .catch((error) => console.error("Error fetching user data:", error));
});
//get details and shwo details page
let detailsPage = document.querySelector(".details-page");
let content = document.querySelector(".content");
let doneBtn = document.querySelector(".details-page .done-btn");
let nameFiled = document.querySelector(".details-page .name");
let emailFiled = document.querySelector(".details-page .email");
let phoneFiled = document.querySelector(".details-page .phone");
let stateFiled = document.querySelector(".details-page .state");
let email;
let editBtns = document.querySelectorAll(".edit");
editBtns.forEach((ele) => {
  ele.addEventListener("click", () => {
    nameFiled.value =
      ele.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    emailFiled.value =
      ele.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    phoneFiled.value =
      ele.previousElementSibling.previousElementSibling.textContent;
    if (ele.previousElementSibling.textContent.toLocaleLowerCase() == "user") {
      stateFiled.value = "user";
    } else {
      stateFiled.value = "admin";
    }
    content.classList.toggle("hide-content");
    detailsPage.classList.toggle("active-page");
  });
});
doneBtn.addEventListener("click", () => {
  content.classList.toggle("hide-content");
  detailsPage.classList.toggle("active-page");
});

//edit button

let editUserBtn = document.querySelector(".edit-btn");
let deleteBtn = document.querySelector(".delete-btn");
let cancelBtn = document.querySelector(".cancel-btn");
let saveBtn = document.querySelector(".save-btn");
//edit buttin
editUserBtn.addEventListener("click", () => {
  nameFiled.style = `
    pointer-events: painted;
    border:1px solid black;
    `;
  stateFiled.style = `
    pointer-events: painted;
    border:1px solid black;
    `;
  doneBtn.style.display = "none";
  editUserBtn.style.display = "none";
  cancelBtn.style.display = "block";
  saveBtn.style.display = "block";
});
//cancel button
cancelBtn.addEventListener("click", () => {
  nameFiled.style = `
    pointer-events: none;
    border:1px solid none;
    `;
  emailFiled.style = `
     pointer-events: none;
    border:1px solid none;
    `;
  phoneFiled.style = `
     pointer-events: none;
    border:1px solid none;
    `;
  stateFiled.style = `
    pointer-events: none;
    border:1px solid none;
    `;
  doneBtn.style.display = "block";
  editUserBtn.style.display = "block";
  cancelBtn.style.display = "none";
  saveBtn.style.display = "none";
  content.classList.toggle("hide-content");
  detailsPage.classList.toggle("active-page");
});
//save button
saveBtn.addEventListener("click", () => {
  nameFiled.style = `
    pointer-events: none;
    border:1px solid none;
    `;
  emailFiled.style = `
     pointer-events: none;
    border:1px solid none;
    `;
  phoneFiled.style = `
     pointer-events: none;
    border:1px solid none;
    `;
  stateFiled.style = `
    pointer-events: none;
    border:1px solid none;
    `;
  doneBtn.style.display = "block";
  editUserBtn.style.display = "block";
  cancelBtn.style.display = "none";
  saveBtn.style.display = "none";
  content.classList.toggle("hide-content");
  detailsPage.classList.toggle("active-page");
});
//Logout Button
window.logout = function() {
  fetch('/admin/customer/logout', {
    method: 'POST' // Change the method to POST
  }).then((result) => {
    console.log('logout success');
  }).catch((err) => {
    console.log(err);
  });
}
