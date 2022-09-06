let form = document.querySelector(".grocery-form");
let alert = document.querySelector(".alert");
let grocery = document.getElementById("grocery");
let submitBtn = document.querySelector(".submit-btn");
let container = document.querySelector(".grocery-container");
let list = document.querySelector(".grocery-list");
let clearBtn = document.querySelector(".clear-btn");
let editElement;
let editFlag = false;
let editID = "";
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", setupItems);
function addItem(e) {
  e.preventDefault();
  let value = grocery.value;
  let id = new Date().getTime().toString();
  if (value !== "" && !editFlag) {
    let element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
    let deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    let editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);
   list.appendChild(element);
    displayAlert("Producto añadido a la lista", "success");
    container.classList.add("show-container");
    addToLocalStorage(id, value);
    setBackToDefault();
}else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    displayAlert("Producto Cambiado", "success");
    editLocalStorage(editID, value);
    setBackToDefault();
} else {
    displayAlert("Por favor ingresa valor", "danger");
}
}
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("Lista vacía", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}
function deleteItem(e) {
  let element = e.currentTarget.parentElement.parentElement;
  let id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("Producto removido", "danger");
  setBackToDefault();
  removeFromLocalStorage(id);
}
function editItem(e) {
  let element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "Editar";
}
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "Enviar";
}
function addToLocalStorage(id, value) {
  let grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}
function createListItem(id, value) {
  let element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("grocery-item");
  element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
            <!-- edit btn -->
            <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
            </button>
            <!-- delete btn -->
            <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
            </button>
            </div>`;
  let deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  let editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);
  list.appendChild(element);
}