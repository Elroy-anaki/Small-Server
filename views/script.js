const mainUrl = "http://localhost:3000";
const urls = {
  getUrl: {
    defult: "/users/",
    byParams: "/users/getbyid/:id",
  },
  postUrl: {
    addUser: "/addUser",
  },
  putUrl: {
    editUser: "/editUser",
  },
  deleteUrl: {
    deleteUser: "/deleteUser/",
  },
};

const usersSection = document.querySelector("#users");
const getParams = document.querySelector("#get-params");

function showGetParams() {
  getParams.style.display === "none"
    ? (getParams.style.display = "inline")
    : (getParams.style.display = "none");
}
async function getByParams(id = Number, name = String) {
  let url = mainUrl + urls.getUrl.defult;
  name.trim() === "" ? (url += `?id=${id}`) : (url += `?id=${id}&name=${name}`);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  buildUsers(data);
}
async function getUsers() {
  const response = await fetch(`${mainUrl}${urls.getUrl.defult}`);
  const data = await response.json();
  buildUsers(data);
}

function buildUsers(arr) {
  console.log(arr);
  usersSection.innerHTML = "";
  arr.forEach((user) => {
    usersSection.innerHTML += `
<div class="border-2 border-black rounded-xl">
          <h2 class="px-5 text-center text-2xl">${user.name}</h2>
          <h3 class="px-5 text-center text-xl">23</h3>
          <div class="text-center bg-red-200 rounded-b-xl mt-2">
        <button type="button"onclick="deleteUser(${user.id}, event)">Delete</button>
          </div>
        </div>
        `;
  });
}

async function deleteUser(id, event) {
  const url = mainUrl + urls.deleteUrl.deleteUser + id;
  console.log(url);
  const response = await fetch(url, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data);
  buildUsers(data);
}
