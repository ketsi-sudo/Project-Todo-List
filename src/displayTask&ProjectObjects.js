import { projectArray, taskArray, Task, Project } from "./createTask&ProjectObjects.js";


export function displayTask() {
    const container = document.querySelector(".taskList");
    container.innerHTML = ``

taskArray.forEach((item) => {

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
      </summary>

  <div class=" accordion-content collapse-content text-sm">
    <hr width="100%" size="2" color="gray">
    <div class="accordion-open-top">
      <p class="note">${item.taskNote}</p>
      
    </div>
    <ul class="note-list"></ul>
    
  </div> `
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






