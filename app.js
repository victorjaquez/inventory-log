// Item Class: For items
class Item {
  constructor(name, description, department, date, quantity, model) {
    this.name = name;
    this.description = description;
    this.department = department;
    this.date = date;
    this.quantity = quantity;
    this.model = model;
  }
}

// UI Class: Handle UI tasks
class UI {
  static displayItems() {
    const items = Store.getItems();
    items.forEach(item => UI.addItemToInventory(item));
  }

  static addItemToInventory(item) {
    const log = document.querySelector("#inventory-log");

    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${item.name}</td>
    <td>${item.description}</td>
    <td>${item.department}</td>
    <td>${item.date}</td>
    <td>${item.quantity}</td>
    <td>${item.model}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
  `;

    log.appendChild(row);
  }
  static deleteItem(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#inventory-form");
    container.insertBefore(div, form);
    // Remove in 2 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }

  static clearFields() {
    document.querySelector("#name").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#department").value = "";
    document.querySelector("#date").value = "";
    document.querySelector("#quantity").value = "";
    document.querySelector("#model").value = "";
  }
}
// Store Class: Handles storage
class Store {
  static getItems() {
    let items;
    if (localStorage.getItem("items") === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
  }

  static addItem(item) {
    const items = Store.getItems();
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
  }

  static removeItem(model) {
    const items = Store.getItems();
    items.forEach((item, index) => {
      if (item.model === model) {
        items.splice(index, 1);
      }
    });
    localStorage.setItem("items", JSON.stringify(items));
  }
}

// Event: Display Inventory
document.addEventListener("DOMContentLoaded", UI.displayItems);

// Event: Add an item
document.querySelector("#inventory-form").addEventListener("submit", e => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const name = document.querySelector("#name").value;
  const description = document.querySelector("#description").value;
  const department = document.querySelector("#department").value;
  const date = document.querySelector("#date").value;
  const quantity = document.querySelector("#quantity").value;
  const model = document.querySelector("#model").value;

  // Validate form inputs
  if (
    name === "" ||
    description === "" ||
    model === "" ||
    department === "" ||
    date === "" ||
    quantity === ""
  ) {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instatiate item
    const item = new Item(name, description, department, date, quantity, model);

    // Add Item to UI
    UI.addItemToInventory(item);

    // Add item to storage
    Store.addItem(item);

    // Show successful submission alert
    UI.showAlert("Item Added", "success");

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove an item, w/ event delegation
document.querySelector("#inventory-log").addEventListener("click", e => {
  // Remove book from UI
  UI.deleteItem(e.target);

  // Remove book from storage
  Store.removeItem(e.target.parentElement.previousElementSibling.textContent);
  // Show successful submission alert
  UI.showAlert("Item Removed", "success");
});
