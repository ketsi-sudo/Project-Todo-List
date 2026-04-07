import { projectArray, taskArray, Task, Project } from "./createTask&ProjectObjects.js";
import { displayTask, displayProject } from "./displayTask&ProjectObjects.js";




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
    const note = document.getElementById("note_task").value
    const checklist = document.getElementById("checklist_task").value

    const anotherOne = new Task (title, dueDate, priority, note, checklist, project)
    taskArray.push(anotherOne)
    console.log(anotherOne)

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