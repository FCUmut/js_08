const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clear = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
// NOTE*: const items = itemList.querySelectorAll("li");

// while loading page it takes items from localStorage and displays
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

// |------- Creating List Items -------|
// ↓ First ↓ - Create Add Item Function
function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add an item");
  }

  // Create item DOM element
  addItemToDOM(newItem);

  // Add item to localStorage
  addItemToStorage(newItem);

  checkUI();

  // Clear Input
  itemInput.value = "";
}

// we separated the adding item into two functions because one of them will handle adding items to DOM and other will add items to local storage
// Adding DOM part
function addItemToDOM(item) {
  // Create List Item
  // ↓ Second ↓ - Create List Element
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  // ↓ Third ↓ - Call Button Function
  const button = createButton("remove-item btn-link text-red");

  // ↓ Fifth ↓ - List Append Button
  li.appendChild(button);

  // ↓ Last ↓ - Item List Append List Element
  itemList.appendChild(li);
}

// ↓ Third ↓ - Create Button Function
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;

  // ↓ Fourth ↓ - Call Icon Function
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

// ↓ Fourth ↓ - Create Icon Function
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// Adding localStorage part
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Conver to JSON string and set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

// |------- Deleting List Items -------|
function onClickItem(e) {
  if (e.target.className === "fa-solid fa-xmark") {
    removeItem(e.target.parentElement.parentElement);
  }
}

// remove item by clicking 'X' icon
function removeItem(item) {
  // // - Old removeItem(e) -
  // // if (e.target.parentElement.classList.contains('remove-item')) {
  // // another option
  // if (e.target.className === "fa-solid fa-xmark") {
  //   if (confirm("Are you sure ?")) {
  //     e.target.parentElement.parentElement.remove();

  //     checkUI(); // NOTE*: Also you should call 'checkUI' again while removing items
  //   }
  // }
  // // ---------------------

  if (confirm("Are you sure ?")) {
    // Remove item from DOM
    item.remove();

    // Remove item from localStorage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be rmoved
  itemsFromStorage = itemsFromStorage.filter((e) => e !== item);

  // Re-set to localStorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// clearing all items by clicking "Clear All" button
function clearItems(e) {
  // Solution-1
  // itemList.innerHTML = "";

  // Solution-2
  while (itemList.firstChild) {
    if (confirm("Are you sure ?")) {
      itemList.removeChild(itemList.firstChild);
    }
  }

  // Clear from localStorage
  localStorage.removeItem("items");

  checkUI(); // NOTE*: Also you should call 'checkUI' here
}

// removing the displaying of clear button and filter box
function checkUI() {
  // NOTE*: if you set 'items' in global scope it will not change anymore so after we remove clear button and filter, we can not bring them back with else statement that's why every time we set 'items' when 'checkUI' is called
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clear.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clear.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// Solution-1 - Filter Items Function
// function filterItems(e) {
//   itemList.childNodes.forEach((list) => {
//     if (list.innerText.includes(e.target.value)) {
//       list.style.display = "flex";
//     } else {
//       list.style.display = "none";
//     }
//   });
// }

// Solution-2 - Filter Items Function
function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLocaleLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Initialize app
function init() {
  // Event Listeners
  // ↓ First ↓ - Call Add Item Function
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clear.addEventListener("click", clearItems);

  // Solution-1 - Filter Items
  // itemFilter.addEventListener("input", filterItems);

  // Solution-2 - Filter Items
  itemFilter.addEventListener("input", filterItems);

  document.addEventListener("DOMContentLoaded", displayItems);
  checkUI();
}

init();
