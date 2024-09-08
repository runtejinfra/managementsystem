document.addEventListener('DOMContentLoaded', function () {
//    const API_URL = 'http://localhost:8080/api/items';
    const API_URL = '/api/items';
    console.log("api-url = ",API_URL)
    const itemForm = document.getElementById('itemForm');
    console.log(itemForm)
    const itemsTableBody = document.getElementById('itemsTable').querySelector('tbody');
    let currentItem = null;

    // Fetch all items
    function loadItems() {
    console.log("load items")
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                itemsTableBody.innerHTML = '';
                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price}</td>
                        <td>${item.amount}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="editItem(${item.id})">Edit</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteItem(${item.id})">Delete</button>
                        </td>
                    `;
                    itemsTableBody.appendChild(row);
                });
            });
    }

    // Add or update item
    itemForm.addEventListener('submit', function (e) {
      console.log("add items")
        e.preventDefault();

        const item = {
            name: document.getElementById('itemName').value,
            quantity: document.getElementById('itemQuantity').value,
            price: document.getElementById('itemPrice').value,
            // amount: document.getElementById('itemAmount').value
        };

        let method = 'POST';
        let url = API_URL;

        if (currentItem) {
            method = 'PUT';
            url = `${API_URL}/${currentItem}`;
        }

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(data => {
                loadItems();
                itemForm.reset();
                currentItem = null;
            });
    });

    // Edit item
    window.editItem = function (id) {
        fetch(`${API_URL}/${id}`)
            .then(response => response.json())
            .then(data => {
                currentItem = id;
                document.getElementById('itemName').value = data.name;
                document.getElementById('itemQuantity').value = data.quantity;
                document.getElementById('itemPrice').value = data.price;
            });
    };

    // Delete item
    window.deleteItem = function (id) {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
            .then(() => loadItems());
    };

    // Load items initially
    loadItems();
});