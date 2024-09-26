// Function to handle Enter keypress
const handleEnter = (event) => {
    if (event.key === 'Enter') {
        addDinner();
    }
};

// Rest of the existing code...
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

window.onload = displayDinners;
