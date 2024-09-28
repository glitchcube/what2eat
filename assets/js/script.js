// Load dinners from localStorage or use a default list
let dinners = JSON.parse(localStorage.getItem('dinnerList')) || ['Pizza', 'Taco', 'Salad', 'Pasta'];

// Function to suggest a random dinner
function suggestDinner() {
    if (dinners.length === 0) {
        document.getElementById('suggested-dinner').innerText = 'No dinners available to suggest.';
    } else {
        const randomDinner = dinners[Math.floor(Math.random() * dinners.length)];
        document.getElementById('suggested-dinner').innerText = `How about: ${randomDinner}?`;
    }
}

// Display dinners on page load
function displayDinners() {
    const dinnerList = document.getElementById('dinner-list');
    dinnerList.innerHTML = ''; // Clear current list
    dinners.forEach((dinner, index) => {
        const listItem = document.createElement('p');
        listItem.innerHTML = `${dinner} <button data-index="${index}">Remove</button>`;
        dinnerList.appendChild(listItem);
    });
}

// Function to add a single dinner
function addDinner() {
    const dinnerInput = document.getElementById('dinner-input');
    const newDinner = dinnerInput.value.trim();
    if (newDinner) {
        dinners.push(newDinner);
        localStorage.setItem('dinnerList', JSON.stringify(dinners)); // Save updated list
        dinnerInput.value = ''; // Clear input field
        displayDinners();
    }
}

// Function to add multiple dinners from a textarea input
function addBulkDinners() {
    const bulkInput = document.getElementById('bulk-dinner-input').value.trim();
    if (bulkInput) {
        const newDinners = bulkInput.split('\n').map(dinner => dinner.trim()).filter(dinner => dinner !== '');
        dinners.push(...newDinners); // Add all new dinners to the list
        localStorage.setItem('dinnerList', JSON.stringify(dinners)); // Save updated list
        document.getElementById('bulk-dinner-input').value = ''; // Clear textarea
        displayDinners(); // Update display
    }
}

// Function to remove a dinner
function removeDinner(index) {
    dinners.splice(index, 1); // Remove dinner at the given index
    localStorage.setItem('dinnerList', JSON.stringify(dinners)); // Save updated list
    displayDinners(); // Update display
}

// Function to switch between tabs
function openTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach((tab) => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.bottom-nav button').forEach((btn) => {
        btn.classList.remove('active');
    });

    // Show the selected tab and activate the button
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[onclick="openTab('${tabId}')"]`).classList.add('active');
}

// Event listener for removing dinners using event delegation
document.addEventListener('DOMContentLoaded', () => {
    const dinnerList = document.getElementById('dinner-list');
    const dinnerInput = document.getElementById('dinner-input');

    if (dinnerList) {
        // Event delegation for remove buttons
        dinnerList.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const index = event.target.dataset.index;
                removeDinner(index);
            }
        });
    }

    if (dinnerInput) {
        // Event listener for the "Enter" key to add a dinner
        dinnerInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                addDinner();
            }
        });
    }

    // Display dinners on page load if we are in the "Manage Dinners" tab
    if (document.getElementById('manage-tab').classList.contains('active')) {
        displayDinners();
    }
});
