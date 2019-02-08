// Item Class: For items
class Item {
  constructor(name, description, model, department, date, quantity) {
    this.name = name;
    this.description = description;
    this.model = model;
    this.department = department;
    this.date = date;
    this.quantity = quantity;
  }
}

// UI Class: Handle UI tasks
class UI {
  static displayItems() {
    const StoredItems = [
      {
        name: "Steering wheel",
        description: "Black leather",
        model: "2231",
        department: "Automotive",
        date: "02/07/2019",
        quantity: "50"
      },
      {
        name: "Seat cover",
        description: "White leather",
        model: "4241",
        department: "Automotive",
        date: "02/07/2019",
        quantity: "100"
      }
    ];
    const items = StoredItems;
    items.forEach(item => UI.addItemToInventory(item));
  }

  static addItemToInventory(item) {
    const log = document.querySelector("#inventory-log");

    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${item.name}</td>
    <td>${item.description}</td>
    <td>${item.model}</td>
    <td>${item.department}</td>
    <td>${item.date}</td>
    <td>${item.quantity}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
  `;

    log.appendChild(row);
  }

  static clearFields() {
    document.querySelector("#name").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#model").value = "";
    document.querySelector("#department").value = "";
    document.querySelector("#date").value = "";
    document.querySelector("#quantity").value = "";
  }
}
// Store Class: Handles storage

// Event: Display Inventory
document.addEventListener("DOMContentLoaded", UI.displayItems);

// Event: Add an item
document.querySelector("#inventory-form").addEventListener("submit", e => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const name = document.querySelector("#name").value;
  const description = document.querySelector("#description").value;
  const model = document.querySelector("#model").value;
  const department = document.querySelector("#department").value;
  const date = document.querySelector("#date").value;
  const quantity = document.querySelector("#quantity").value;

  // Instatiate item
  const item = new Item(name, description, model, department, date, quantity);

  // Add Item to UI
  UI.addItemToInventory(item);

  // Clear fields
  UI.clearFields();
});

// Event: Remove an item
