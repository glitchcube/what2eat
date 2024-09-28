document.addEventListener('DOMContentLoaded', () => {
    const dinnerInput = document.getElementById('dinner-input');
    const dinnerList = document.getElementById('dinner-list');
    let dinners = JSON.parse(localStorage.getItem('dinnerList')) || [];

    // Display dinners on page load
    displayDinners();

    // Event listener for adding dinner via "Enter" key
    dinnerInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addDinner();
        }
    });

    // Event delegation for removing dinners
    dinnerList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            removeDinner(event.target.dataset.index);
        }
    });

    // Function to add dinner
    function addDinner() {
        const newDinner = dinnerInput.value.trim();
        if (newDinner) {
            dinners.push(newDinner);
            localStorage.setItem('dinnerList', JSON.stringify(dinners));
            dinnerInput.value = '';
            displayDinners();
        }
    }

    // Function to display all dinners
    function displayDinners() {
        dinnerList.innerHTML = '';
        dinners.forEach((dinner, index) => {
            const listItem = document.createElement('p');
            listItem.innerHTML = `${dinner} <button data-index="${index}">Remove</button>`;
            dinnerList.appendChild(listItem);
        });
    }

    // Function to remove dinner
    function removeDinner(index) {
        dinners.splice(index, 1);
        localStorage.setItem('dinnerList', JSON.stringify(dinners));
        displayDinners();
    }
});
