import "./styles.css";
import "./sidebar.js"; // imports sidebar behaviour but no values bc no {}
import "./userInput.js";


import 'lakelib/lib/lake.css';
import { Editor, Toolbar } from 'lakelib';
import { Nodes } from 'lakelib';

const body = new Nodes(document.body);
body.append('<p>foo</p>');

const toolbarItems = [
  'undo',
  'redo',
  '|',
  'bold',
];
const toolbar = new Toolbar({
  root: '.my-toolbar',
  items: toolbarItems,
});


export const editor = new Editor({
  root: '.my-content',
  toolbar,
});
editor.render();

// let content = editor.getValue();

const btn = document.querySelector("#Ssave")
btn.addEventListener("click", () => {
  content = editor.getValue();
  console.log(content)
  renderEditor()
})








// create tasks and projects

let projectArray = []
let taskArray = []
localStorage.clear()


class Project {
    constructor (projectName) {
        this.projectName = projectName
        this.uuid = crypto.randomUUID()
        // this.projectTasks = []
        this.type = "project"
    }

    addToSelect() {
      const sel = document.getElementById("project_task");
      const opt = document.createElement("option");
      opt.value = this.projectName;
      opt.text = `${this.projectName}`;
      sel.add(opt, null);
    }

};

let inbox = new Project("Inbox");
let health = new Project("Health");

projectArray.push(inbox)
projectArray.push(health)

//save each project in local storage under it's own projectName
function saveProjectInStorage() {
projectArray.forEach((project) => {
  let keyName = project.projectName
  localStorage.setItem(keyName, JSON.stringify(project))
})
}
saveProjectInStorage()
displayProject();
// add to select
inbox.addToSelect();
health.addToSelect()






class Task {
    constructor(taskName, dueDate, priority, taskNote, taskProject = "Inbox", taskComplete = false) {
      this.taskName = taskName;
      this.dueDate = dueDate;
      this.priority = priority // ["Low", "Medium", "High"];
      this.taskProject = taskProject;
      this.taskNote = taskNote;
      this.taskComplete = taskComplete; // false ot true;
      this.uuid = crypto.randomUUID()
      this.type = "task"
    }
};
// no need to be exported
const newTask = new Task("Get groceries", "01/01/2027", "Low", "Buy nothing that is not on this list!",);
const newertask = new Task("Workout", "01/01/2027", "Low", "Buy nothing that is not on this list!", "Health");
taskArray.push(newTask)
taskArray.push(newertask)

//save each task in local storage under it's own taskName
function saveTaskInStorage() {
taskArray.forEach((task) => {
  let keyName = task.taskName
  localStorage.setItem(keyName, JSON.stringify(task))
})
}
saveTaskInStorage() ;





// build search index
let searchIndex = [];
function buildSearchIndex() {
  searchIndex = Object.keys(localStorage).map((key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null; // Skip invalid JSON
    }
  }).filter(Boolean); // Remove nulls
}
 
// Build index when the app loads
buildSearchIndex();
console.log(searchIndex);


// display the project's task on click
const projectList = document.querySelector(".project-list");

projectList.addEventListener("click", (e) => {

  if (e.target.tagName !== "BUTTON") {
    let clickedProject = e.target.textContent;;
    console.log(clickedProject)
    searchIndexForTerm(clickedProject);

  } else {
    let clickedId = e.target.id
    console.log(clickedId)
    const sidebarProjects = document.querySelectorAll(".single-project");
    const sidebarArray = Array.from(sidebarProjects)

    sidebarArray.filter((item) => {
      if (item.getAttribute("id") === clickedId) {
        let name = item.getAttribute("name");
        deleteProjectStorage(name);
        deleteProjectDom(item, name);
      }
    })
  }

});



// add new projects

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
    //add to select
    anotherOne.addToSelect()

    // save to local storage
    saveProjectInStorage();

    // update 
    displayProject();
}


function displayProject() {
    const container = document.querySelector(".project-list");
    container.innerHTML = ``

    projectArray.forEach((item) => {
        const newProject = document.createElement("a");
        newProject.setAttribute("id", item.uuid)
        newProject.setAttribute("name", item.projectName)
        newProject.classList.add("single-project")
        
        container.appendChild(newProject)

        newProject.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  
          <path d="M2.22222 20C1.61111 20 1.08815 19.7826 0.653333 19.3478C0.218519 18.913 0.000740741 18.3896 0 17.7778V2.22222C0 1.61111 0.217778 1.08815 0.653333 0.653333C1.08889 0.218519 1.61185 0.000740741 2.22222 0H17.7778C18.3889 0 18.9122 0.217778 19.3478 0.653333C19.7833 1.08889 20.0007 1.61185 20 2.22222V17.7778C20 18.3889 19.7826 18.9122 19.3478 19.3478C18.913 19.7833 18.3896 20.0007 17.7778 20H2.22222ZM11.9167 13.8333C12.4907 13.4259 12.8889 12.8889 13.1111 12.2222H17.7778V2.22222H2.22222V12.2222H6.88889C7.11111 12.8889 7.50926 13.4259 8.08333 13.8333C8.65741 14.2407 9.2963 14.4444 10 14.4444C10.7037 14.4444 11.3426 14.2407 11.9167 13.8333Z" fill="#797879"/>
          </svg>
          <p>${item.projectName}</p>`

        const newDeleteBtn = document.createElement("button");
        newDeleteBtn.setAttribute("id", item.uuid)
  
        newDeleteBtn.classList.add("delete-project")
        newProject.appendChild(newDeleteBtn)
        newDeleteBtn.textContent = "x"
    })
    

}


// - when new project is created, push it as an option to select
// - when project is deleted remove from select, local storage, sidebar, remove all it's tasks from local storage
function deleteProjectDom(project, name) {
  const container = document.querySelector(".project-list");
  container.removeChild(project); // remove from sidebar
  const sel = document.getElementById("project_task");
  for (let i = sel.options.length - 1; i >= 0; i--) {
     if (sel.options[i].value === name) {
       sel.remove(i);  // remove from select
     }
   }

  searchIndexForTerm("inbox"); // show inbox tasks
}

function deleteProjectStorage(name) {
  localStorage.removeItem(name) // remove from local storage 
  const normalizedTerm = name.toLowerCase();
  console.log(normalizedTerm)
  return searchIndex.filter(item => {
    // console.log(item)
    if (item.type === "task" && item.taskProject.toLowerCase() === normalizedTerm) // Normalize stored data 
    {
      localStorage.removeItem(item.taskName) // removes associated tasks
    } 
   
  });

}










// add new tasks


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

    const anotherOne = new Task (title, dueDate, priority, note, project)
    taskArray.push(anotherOne)
    console.log(anotherOne)
    // save to local storage
    saveTaskInStorage();

    // update 
    buildSearchIndex();
    console.log(searchIndex)
    searchIndexForTerm(project);
};














function wipeTasklist() {
  const container = document.querySelector(".taskList");
  container.innerHTML = "";
}

// show the tasks with the clickedProject as their taskProject on click
let displayedArray = [];
function searchIndexForTerm(searchTerm) {
  const normalizedTerm = searchTerm.toLowerCase();
  console.log(searchTerm)
  wipeTasklist()
  return searchIndex.filter(item => {
    // console.log(item)
    if (item.type === "task" && item.taskProject.toLowerCase() === normalizedTerm) // Normalize stored data 
    {
      displayedArray.push(item);
      displayshituk(displayedArray);
       // clear array so tasks from other projects dont start to stack up
    } 
     displayedArray = [];
  });
};


function displayshituk (array) {

  array.forEach((item) => {
  
    if (item.taskNote === undefined || item.taskChecklist === undefined) {

      const container = document.querySelector(".taskList");
      const newTaskDiv = document.createElement("details");
      newTaskDiv.classList.add("accordion-item");
      newTaskDiv.classList.add("collapse");
      newTaskDiv.classList.add("single-task")
      newTaskDiv.setAttribute("name", "my-accordion-det-1" );

      newTaskDiv.setAttribute("id", item.uuid)
     
      

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
                
                <svg class="delete-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="black" fill-opacity="0.5" class="delete-svg"/>
                </svg>
  
            </div>
  
            <div class="accordion-closed-bottom">
              <p class="due-text">Due ${item.dueDate}</p>
              <p class="priority-text">${item.priority}</p>
            </div>
          </div>
        </summary>`

        const deleteSvg = document.querySelector(".delete-svg")
        deleteSvg.setAttribute("id", item.uuid)
        let deleteId = item.uuid

        const allDeleteSvg = document.querySelectorAll(".delete-svg")

        const arrDeleteSvg = Array.from(allDeleteSvg)
        arrDeleteSvg.forEach((item) => {
          item.setAttribute("id", deleteId)
        })

        console.log(deleteSvg)
        // console.log(newTaskDiv.outerHTML)
  
  
  
    } else {
    
      const container = document.querySelector(".taskList");
      const newTaskDiv = document.createElement("details");
      newTaskDiv.classList.add("accordion-item");
      newTaskDiv.classList.add("collapse");
      newTaskDiv.classList.add("single-task")
      newTaskDiv.setAttribute("name", "my-accordion-det-1" );

      newTaskDiv.setAttribute("id", item.uuid)
     
      

      container.appendChild(newTaskDiv);
      newTaskDiv.innerHTML =  `
       
        <summary class="collapse-title font-semibold">
          <div class="accordion-header">
            <div class="accordion-closed-top">
              <div class="accordion-closed-top-title">
                <label>
                  <input type="checkbox"  class="checkbox  border-neutral-600 bg-mist-50 text-mist-50 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-400" />  
                  ${item.taskName}
                </label>
              </div>
                <svg class="delete-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="black" fill-opacity="0.5" class="delete-svg"/>
                </svg>
            </div>
  
            <div class="accordion-closed-bottom">
              <p class="due-text">Due ${item.dueDate}</p>
              <p class="priority-text">${item.priority}</p>
            </div>
          </div>
        </summary> `

        const deleteSvg = document.querySelector(".delete-svg")
        deleteSvg.setAttribute("id", item.uuid)
        let deleteId = item.uuid

        const allDeleteSvg = document.querySelectorAll(".delete-svg")

        const arrDeleteSvg = Array.from(allDeleteSvg)
        arrDeleteSvg.forEach((item) => {
          item.setAttribute("id", deleteId)
        })

        console.log(deleteSvg)
    }
  })
}







// when a task is removed, delete form DOM and local storage
const taskList = document.querySelector(".taskList")
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains('delete-svg')) {
    console.log(e.target.id)
    let targetId = e.target.id
    let targetProject = "";

    const allTasks = document.querySelectorAll(".single-task")
    const arrTasks = Array.from(allTasks);

    arrTasks.forEach((task) => {
      console.log(task)
      taskList.removeChild(task) // remove from DOM
    })

    searchIndex.filter(item => {
    // console.log(item)
      if (item.type === "task" && item.uuid === targetId) 
      {
        targetProject = item.taskProject
        localStorage.removeItem(item.taskName) // removes tasks from local storage
        console.log(`${item.taskName} IS GONE!`)
      } 
    });

    taskArray.filter(item => {
      // console.log(item)
      if (item.type === "task" && item.uuid === targetId) 
      {
        let x = taskArray.indexOf(item) // removes tasks from task Array
        taskArray.splice(x, 1)
      } 
    });
    

    buildSearchIndex() // rebuild 
    searchIndexForTerm(targetProject); // display the rest of the tasks for the same project

  }
  
})





