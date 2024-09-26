// Initialize the dinner list from localStorage if available
let dinners = JSON.parse(localStorage.getItem('dinnerList')) || [];

// Display the current list of dinners
function displayDinners() {
    const dinnerList = document.getElementById('dinner-list');
    dinnerList.innerHTML = '';
    dinners.forEach((dinner, index) => {
        dinnerList.innerHTML += `<p>${dinner} <button onclick="removeDinner(${index})">Remove</button></p>`;
    });
}

// Add a new dinner to the list
function addDinner() {
    const dinnerInput = document.getElementById('dinner-input');
    const newDinner = dinnerInput.value.trim();
    if (newDinner) {
        dinners.push(newDinner);
        localStorage.setItem('dinnerList', JSON.stringify(dinners));
        dinnerInput.value = '';
        displayDinners();
    }
}

// Remove a dinner from the list
function removeDinner(index) {
    dinners.splice(index, 1);
    localStorage.setItem('dinnerList', JSON.stringify(dinners));
    displayDinners();
}

// Suggest a random dinner
function suggestDinner() {
    if (dinners.length > 0) {
        const randomDinner = dinners[Math.floor(Math.random() * dinners.length)];
        document.getElementById('suggested-dinner').innerText = `How about: ${randomDinner}?`;
    } else {
        document.getElementById('suggested-dinner').innerText = 'No dinners available to suggest.';
    }
}

// Load and display the dinner list when the page loads
window.onload = displayDinners;
