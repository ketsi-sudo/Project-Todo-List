
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