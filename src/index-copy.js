import "./styles.css";
 import "./sidebar.js"; // imports sidebar behaviour but no values bc no {}
// import { displayTask } from "./taskDOM.js";
// import { greeting } from "./DOM.js";



// create Task and project objects

let projectArray = []
let taskArray = []

class Project {
    constructor (projectName) {
        this.projectName = projectName
        this.projectTasks = []
    }
};
//no need to be exported
const inbox = new Project("Inbox");
projectArray.push(inbox);

class Task {
    constructor(taskName, dueDate, priority, taskNote, taskChecklist = [], taskproject = "Inbox", taskComplete = false) {
      this.taskName = taskName;
      this.dueDate = dueDate;
      this.priority = priority // ["Low", "Medium", "High"];
      this.taskNote = taskNote;
      this.taskChecklist = taskChecklist;
      this.taskproject = taskproject;
      this.taskComplete = taskComplete; // false ot true;
      this.uuid = crypto.randomUUID()
    }
};
// no need to be exported
const newTask = new Task("Get groceries", "01/01/2027", "Low", "Buy nothing that is not on this list!", ["Mouthwash", "Apples", "Bananas", "Donuts"]);


taskArray.push(newTask)
console.log(newTask);

console.log(`tasks : ${taskArray}`)
console.log(`projects : ${projectArray}`)



export { projectArray, taskArray, Task, Project }













// userInput.js'
// import { projectArray, taskArray, Task, Project } from "./createTask&ProjectObjects.js";
// import { displayTask, displayProject } from "./displayTask&ProjectObjects.js";
// import { editor } from "./index.js";



// Get task form element
const form = document.querySelector('.create-task');   
const submitBtn = document.querySelector(".submit-task")                

// Add a form submit event listener
submitBtn.addEventListener('click', taskUserInput)

function taskUserInput(e) {
  e.preventDefault(); // Prevent form submission

    // Access and log the values
    const title = document.getElementById("title_task").value
    const priority = document.getElementById("priority_task").value
    const project = document.getElementById("project_task").value
    const dueDate = document.getElementById("due_date").value
    const note = editor.getValue();
    // const note = document.getElementById("note_task").value
    // create an array from the text value of checklist and store that array as the checklist value
    // let checklistStr = document.getElementById("checklist_task").value;
    // let checklist = checklistStr.split("-");

    const anotherOne = new Task (title, dueDate, priority, note,)
    taskArray.push(anotherOne)
    console.log(anotherOne)
    let keyName = taskArray.at(-1).uuid 
    localStorage.setItem(keyName, JSON.stringify(taskArray.at(-1)))
    console.log(JSON.parse(localStorage.getItem("keyName")))

    // update 
    displayTask();
};




// Get project form element
const projectForm = document.querySelector('.create-project');
const projectSubmitBtn = document.querySelector(".submit-project");

projectSubmitBtn.addEventListener("click", projectUserInput)

function projectUserInput(e) {
    e.preventDefault(); // Prevent form submission
    // Access and log the values
    const title = document.getElementById("title_project").value
    const anotherOne = new Project(title);
    projectArray.push(anotherOne)
    console.log(anotherOne)
    console.log(projectArray)

    // update 
    displayProject();
}













//display tasks and objects
// import { projectArray, taskArray, Task, Project } from "./createTask&ProjectObjects.js";
// import { Editor, Toolbar } from 'lakelib';
// // import { renderEditor } from "./index.js";


export function displayTask() {
    const container = document.querySelector(".taskList");
    container.innerHTML = ``

taskArray.forEach((item) => {

     const readEditor = new Editor({
        root: ".accordion-open-top",
        readonly: true,
    });
    // readEditor.render()
    readEditor.setValue('item.taskNote');



  if (item.taskNote === undefined && item.taskChecklist === undefined) {

    const newTaskDiv = document.createElement("details");
    const container = document.querySelector(".taskList");
    newTaskDiv.classList.add("accordion-item");
    newTaskDiv.classList.add("collapse");
    newTaskDiv.setAttribute("name", "my-accordion-det-1" );
    container.appendChild(newTaskDiv);
    newTaskDiv.innerHTML = `
     
      <summary class="collapse-title font-semibold">
        <div class="accordion-header">
          <div class="accordion-closed-top">
            <div class="accordion-closed-top-title">
              <label>
                <input type="checkbox"  class="checkbox  border-neutral-600 bg-mist-50 text-mist-50 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-400" />  
                ${item.taskName}
              </label>
            </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="black" fill-opacity="0.5"/>
              </svg>
          </div>

          <div class="accordion-closed-bottom">
            <p class="due-text">Due ${item.dueDate}</p>
            <p class="priority-text">${item.priority}</p>
          </div>
        </div>
      </summary>`



  } else {
  
    const newTaskDiv = document.createElement("details");
    const container = document.querySelector(".taskList");
    newTaskDiv.classList.add("accordion-item");
    newTaskDiv.classList.add("collapse");
    newTaskDiv.setAttribute("name", "my-accordion-det-1" );
    container.appendChild(newTaskDiv);
    

    newTaskDiv.innerHTML = `
     
      <summary class="collapse-title font-semibold">
        <div class="accordion-header">
          <div class="accordion-closed-top">
            <div class="accordion-closed-top-title">
              <label>
                <input type="checkbox"  class="checkbox  border-neutral-600 bg-mist-50 text-mist-50 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-400" />  
                ${item.taskName}
              </label>
            </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="black" fill-opacity="0.5"/>
              </svg>
          </div>

          <div class="accordion-closed-bottom">
            <p class="due-text">Due ${item.dueDate}</p>
            <p class="priority-text">${item.priority}</p>
          </div>
        </div>
      </summary> `

//   <div class=" accordion-content collapse-content text-sm">
//     <hr width="100%" size="2" color="gray">
//     <div class="accordion-open-top"> 
//       <p class="note"></p>
      
//     </div>
//     <ul class="note-list"></ul>
    
//   </div> `




  }
})

}


export function displayProject() {
    const container = document.querySelector(".project-list");
    container.innerHTML = ``

    projectArray.forEach((item) => {
        const newProject = document.createElement("a");
        newProject.classList.add("single-folder")
        container.appendChild(newProject)
        newProject.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.22222 20C1.61111 20 1.08815 19.7826 0.653333 19.3478C0.218519 18.913 0.000740741 18.3896 0 17.7778V2.22222C0 1.61111 0.217778 1.08815 0.653333 0.653333C1.08889 0.218519 1.61185 0.000740741 2.22222 0H17.7778C18.3889 0 18.9122 0.217778 19.3478 0.653333C19.7833 1.08889 20.0007 1.61185 20 2.22222V17.7778C20 18.3889 19.7826 18.9122 19.3478 19.3478C18.913 19.7833 18.3896 20.0007 17.7778 20H2.22222ZM11.9167 13.8333C12.4907 13.4259 12.8889 12.8889 13.1111 12.2222H17.7778V2.22222H2.22222V12.2222H6.88889C7.11111 12.8889 7.50926 13.4259 8.08333 13.8333C8.65741 14.2407 9.2963 14.4444 10 14.4444C10.7037 14.4444 11.3426 14.2407 11.9167 13.8333Z" fill="#797879"/>
          </svg>
          <p>${item.projectName}</p>`
    })

}































// add list item on click

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










