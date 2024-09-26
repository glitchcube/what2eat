// Function to handle Enter keypress
const handleEnter = (event) => {
    if (event.key === 'Enter') {
        addDinner();
    }
};

// Initialize dinner list from localStorage
let dinners = JSON.parse(localStorage.getItem('dinnerList')) || [];

const displayDinners = () => {
    const dinnerList = document.getElementById('dinner-list');
    dinnerList.innerHTML = '';
    dinners.forEach((dinner, index) => {
        dinnerList.innerHTML += `<p>${dinner} <button onclick="removeDinner(${index})">Remove</button></p>`;
    });
};

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

// Function to add multiple dinners from textarea input
const addBulkDinners = () => {
    const bulkInput = document.getElementById('bulk-dinner-input').value.trim();
    if (bulkInput) {
        // Split the input by new lines and filter out any empty lines
        const newDinners = bulkInput.split('\n').map(dinner => dinner.trim()).filter(dinner => dinner !== '');
        dinners.push(...newDinners); // Add all new dinners to the list
        localStorage.setItem('dinnerList', JSON.stringify(dinners));
        document.getElementById('bulk-dinner-input').value = ''; // Clear the textarea
        displayDinners(); // Update the display
    }
};

const removeDinner = (index) => {
    dinners.splice(index, 1);
    localStorage.setItem('dinnerList', JSON.stringify(dinners));
    displayDinners();
};

const suggestDinner = () => {
    const suggestion = dinners.length > 0 ?
        `How about: ${dinners[Math.floor(Math.random() * dinners.length)]}?` :
        'No dinners available to suggest.';

    document.getElementById('suggested-dinner').innerText = suggestion;
};

// Load dinners when page loads
window.onload = displayDinners;
