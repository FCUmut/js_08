const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clear = document.getElementById("clear");

// |------- Creating List Items -------|
// ↓ First ↓ - Create Add Item Function
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add an item");
  }

  // Create List Item
  // ↓ Second ↓ - Create List Element
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  // ↓ Third ↓ - Call Button Function
  const button = createButton("remove-item btn-link text-red");

  // ↓ Fifth ↓ - List Append Button
  li.appendChild(button);

  // ↓ Last ↓ - Item List Append List Element
  itemList.appendChild(li);

  // Clear Input
  itemInput.value = "";
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

// |------- Deleting List Items -------|
// remove item by clicking 'X' icon
function removeItem(e) {
  // another option
  // if (e.target.parentElement.classList.contains('remove-item')) {
  if (e.target.className === "fa-solid fa-xmark") {
    e.target.parentElement.parentElement.remove();
  }
}

// clearing all items by clicking "Clear All" button
function clearItems(e) {
  // Solution-1
  // itemList.innerHTML = "";

  // Solution-2
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}

// Event Listeners
// ↓ First ↓ - Call Add Item Function
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
itemList.addEventListener("click", removeItem);
clear.addEventListener("click", clearItems);
