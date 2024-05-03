//to show the links list in medium and small screens
let listIcon = document.querySelector("#menu-icon");
let dashboard = document.querySelector(".dashboard-container");
listIcon.addEventListener("click", () => {
  dashboard.classList.toggle("activeList");
});

window.logout = function () {
  fetch("/admin/dashboard/logout", {
    method: "POST", // Change the method to POST
  })
    .then((result) => {
      console.log("logout success");
    })
    .catch((err) => {
      console.log(err);
    });
};
