const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clear = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
// NOTE*: const items = itemList.querySelectorAll("li");

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

  checkUI();

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
    if (confirm("Are you sure ?")) {
      e.target.parentElement.parentElement.remove();

      checkUI(); // NOTE*: Also you should call 'checkUI' again while removing items
    }
  }
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
    checkUI(); // NOTE*: Also you should call 'checkUI' here
  }
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

// Solution-1 - Function
// function filterItems(e) {
//   itemList.childNodes.forEach((list) => {
//     if (list.innerText.includes(e.target.value)) {
//       list.style.display = "flex";
//     } else {
//       list.style.display = "none";
//     }
//   });
// }

// Solution-2 - Function
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

// Event Listeners
// ↓ First ↓ - Call Add Item Function
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
itemList.addEventListener("click", removeItem);
clear.addEventListener("click", clearItems);

// Solution-1
// itemFilter.addEventListener("input", filterItems);

// Solution-2
itemFilter.addEventListener("input", filterItems);

checkUI();
