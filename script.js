const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

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

// Event Listeners
// ↓ First ↓ - Call Add Item Function
itemForm.addEventListener("submit", addItem);
