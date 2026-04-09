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

class Project {
    constructor (projectName) {
        this.projectName = projectName
        this.projectTasks = []
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

let keyName = inbox.projectName
localStorage.setItem(keyName, JSON.stringify(inbox))
const x = localStorage.getItem("inbox")
console.log(x)




projectArray.push(inbox);











class Task {
    constructor(taskName, dueDate, priority,taskproject = "Inbox", taskNote, taskComplete = false) {
      this.taskName = taskName;
      this.dueDate = dueDate;
      this.priority = priority // ["Low", "Medium", "High"];
      this.taskproject = taskproject;
      this.taskNote = taskNote;
      this.taskComplete = taskComplete; // false ot true;
      this.uuid = crypto.randomUUID()
    }
};
// no need to be exported
const newTask = new Task("Get groceries", "01/01/2027", "Low", "Buy nothing that is not on this list!",);


taskArray.push(newTask)
console.log(newTask);

console.log(`tasks : ${taskArray}`)
console.log(`projects : ${projectArray}`)