const input = document.querySelector(".textArea");
const submitBtn = document.querySelector(".btn-submit");
const tasks = document.querySelector(".tasks");
const content = document.querySelector(".content");
const h2 = document.querySelector(".content h2");
const msg = document.querySelector(".message");

// put placeholder text in iput text area
input.setAttribute("placeholder", "Buy eggs!");

let taskArr = [];
let taskCounter = 0;
let check = true;

const addTask = function () {
  // remove msg if it is displeyd
  msg.classList.add("hidden");

  if (input.value !== "" && check == true) {
    // Creating ToDo element
    //create task
    const task = document.createElement("div");
    task.setAttribute("class", "task");

    //ToDO text
    taskArr[taskCounter] = document.createElement("p");
    taskArr[taskCounter].setAttribute("class", "task-content");
    task.appendChild(taskArr[taskCounter]);
    taskArr[taskCounter].innerHTML = input.value;
    input.value = "";

    //ToDO buttnons
    //div
    const btnTask = document.createElement("div");
    btnTask.setAttribute("class", "btn-tasks");
    task.appendChild(btnTask);

    //edit
    const btnEdit = document.createElement("button");
    btnEdit.innerHTML = "Edit";
    btnEdit.setAttribute("class", "btn-edit");
    btnEdit.setAttribute("id", `${taskCounter}`);

    //edit task event
    btnEdit.addEventListener("click", function () {
      // first i change elemets for edit mode
      h2.innerHTML = "Edite your task";
      submitBtn.value = "Edit";
      // take value from task that is selected
      input.value = taskArr[btnEdit.id].innerHTML;

      // to disable submit task mode
      check = false;

      //edit button in edit mode
      const edditTask = function () {
        //get changed name for selected task
        taskArr[btnEdit.id].innerHTML = input.value;

        //get back everything to submit mode
        h2.innerHTML = "Add Items";
        submitBtn.value = "Submit";
        input.value = "";

        // msg to user that edit task is complited
        msg.classList.remove("hidden");
        check = true; // back to submit mode
        console.log(taskArr[btnEdit.id]);
      };
      submitBtn.addEventListener("click", edditTask);
      input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") edditTask();
      });
    });

    btnTask.appendChild(btnEdit);

    //delete
    const btnDel = document.createElement("button");
    btnDel.innerHTML = "Delete";
    btnDel.setAttribute("class", "btn-del");
    btnDel.setAttribute("id", `${taskCounter}`);

    //remove task event
    btnDel.addEventListener("click", function () {
      tasks.removeChild(task);
      taskArr.splice(btnDel.id);
      taskCounter--;
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
