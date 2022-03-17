const input = document.querySelector(".textArea");
const submitBtn = document.querySelector(".btn-submit");
const tasks = document.querySelector(".tasks");
const content = document.querySelector(".content");
const h2 = document.querySelector(".content h2");
const msg = document.querySelector(".message");

// put placeholder text in iput text area
input.setAttribute("placeholder", "Buy eggs!");

let btnEditArr = [];

let str = [];
let taskCounter = 0;
let check = true;

const addTask = function () {
  // remove msg if it is displeyd
  msg.classList.add("hidden");

  if (input.value !== "" && check == true) {
    str[taskCounter] = input.value;
    input.value = "";
    // console.log(str[taskCounter]);

    // Creating ToDo element
    //create task
    const task = document.createElement("div");
    task.setAttribute("class", "task");

    //ToDO text
    const content = document.createElement("p");
    content.setAttribute("class", "task-content");
    task.appendChild(content);
    content.innerHTML = str[taskCounter];

    //ToDO buttnons
    //div
    const btnTask = document.createElement("div");
    btnTask.setAttribute("class", "btn-tasks");
    task.appendChild(btnTask);

    //edit
    const btnEdit = document.createElement("button");
    btnEdit.innerHTML = "Edit";
    btnEdit.setAttribute("class", "btn-edit");

    //edit task event
    btnEdit.addEventListener("click", function () {
      // first i change elemets for edit mode
      h2.innerHTML = "Edite your task";
      submitBtn.value = "Edit";
      input.value = content.innerHTML; // take value from task that is selected

      // to disable submit task mode
      check = false;

      //edit button in edit mode
      submitBtn.addEventListener("click", function () {
        //get changed name for selected task
        content.innerHTML = input.value;

        //get back everything to submit mode
        h2.innerHTML = "Add Items";
        submitBtn.value = "Submit";
        input.value = "";

        // msg to user that edit task is complited
        msg.classList.remove("hidden");
        check = true; // back to submit mode
      });
    });

    btnTask.appendChild(btnEdit);
    btnEditArr[taskCounter] = btnTask;

    //delete
    const btnDel = document.createElement("button");
    btnDel.innerHTML = "Delete";
    btnDel.setAttribute("class", "btn-del");

    //remove task event
    btnDel.addEventListener("click", function () {
      tasks.removeChild(task);
    });
    btnTask.appendChild(btnDel);

    // Append a whole ToDo element
    const append = tasks.appendChild(task);
    taskCounter++;

    // add task heading
    if (taskCounter > 0) {
      document.querySelector(".tasks h2").classList.remove("hidden");
    }
  }
};

// Submit
submitBtn.addEventListener("click", addTask);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});
