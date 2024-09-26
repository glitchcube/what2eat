// Initialize the dinner list from localStorage if available
let dinners = JSON.parse(localStorage.getItem('dinnerList')) || [];

// Display the current list of dinners
const displayDinners = () => {
    const dinnerList = document.getElementById('dinner-list');
    dinnerList.innerHTML = '';
    dinners.forEach((dinner, index) => {
        dinnerList.innerHTML += `<p>${dinner} <button onclick="removeDinner(${index})">Remove</button></p>`;
    });
};

// Add a new dinner to the list
const addDinner = () => {
    const dinnerInput = document.getElementById('dinner-input');
    const newDinner = dinnerInput.value.trim();
    if (newDinner) {
        dinners.push(newDinner);
        localStorage.setItem('dinnerList', JSON.stringify(dinners));
        dinnerInput.value = '';
        displayDinners();
    }
};

// Remove a dinner from the list
const removeDinner = (index) => {
    dinners.splice(index, 1);
    localStorage.setItem('dinnerList', JSON.stringify(dinners));
    displayDinners();
};

// Suggest a random dinner
const suggestDinner = () => {
    const suggestion = dinners.length > 0 ?
        `How about: ${dinners[Math.floor(Math.random() * dinners.length)]}?` :
        'No dinners available to suggest.';

    document.getElementById('suggested-dinner').innerText = suggestion;
};

// Load and display the dinner list when the page loads
window.onload = displayDinners;
