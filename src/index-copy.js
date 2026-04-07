import "./styles.css";
 import "./sidebar.js"; // imports sidebar behaviour but no values bc no {}
// import { displayTask } from "./taskDOM.js";
// import { greeting } from "./DOM.js";

















const inputField = document.getElementById('newItemInput');
const addButton = document.getElementById('addButton');
const listContainer = document.getElementById('dynamicList');
const errorMessage = document.createElement('div'); // For validation messages
errorMessage.classList.add('error-message');
document.querySelector('.main').appendChild(errorMessage);
 
// Function to add a new list item
function addListItem() {
    // Get trimmed input value to avoid whitespace-only items
    const itemText = inputField.value.trim();
 
    // Validate input
    if (!itemText) {
        errorMessage.textContent = "Please enter a non-empty item!";
        errorMessage.style.display = 'block';
        return; // Exit function if input is empty
    }
 
    // Clear error message if input is valid
    errorMessage.style.display = 'none';
 




    // Create a new task element li > span > input + label + delete button

    const newListItem = document.createElement('li');
    listContainer.appendChild(newListItem); // listing added


    const newSpan = document.createElement('span');
    newListItem.appendChild(newSpan); // span added

    const newCheckbox = document.createElement('input');
    newCheckbox.setAttribute("type", "checkbox")
    newCheckbox.setAttribute("id", "task")
    newSpan.appendChild(newCheckbox); // input added to span

    const newLabel = document.createElement('label');
    newLabel.setAttribute("for", "task")
    newSpan.appendChild(newLabel); // label added to span

 
     // Set the text content of the label to the input value
    newLabel.textContent = itemText;
 
    // Add a delete button to the list item (enhancement)
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    
    // Add click event to delete the item
    deleteButton.addEventListener('click', () => {
        listContainer.removeChild(newListItem);
    });
 
    // Append the delete button to the <li>
    newSpan.appendChild(deleteButton);
 
    
 
    // Clear the input field after adding the item
    inputField.value = '';
}
 
// Add click event listener to the "Add Item" button
addButton.addEventListener('click', addListItem);
 
// Optional: Allow adding items by pressing Enter in the input field
inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addListItem();
    }
});










