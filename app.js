let taskList = document.querySelector(".task-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  let text = document.getElementById("taskInput").value.trim();
  let category = document.getElementById("categorySelect").value;
  let due = document.getElementById("dateInput").value;

  if (text === "" || due === "") return alert("Enter task and due date.");

  tasks.push({ text, category, due, completed: false });
  saveTasks();
  displayTasks();
}

function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let timeLeft = getRemainingTime(task.due);

    taskList.innerHTML += `
      <li class="${task.completed ? 'completed' : ''}">
        <div>
          <strong>${task.text}</strong><br>
          <span class="category">${task.category}</span> ·
          <span class="countdown" id="time-${index}">${timeLeft}</span>
        </div>
        <div>
          <button class="complete-btn" onclick="toggleComplete(${index})">✅</button>
          <button class="delete-btn" onclick="deleteTask(${index})">🗑</button>
        </div>
      </li>
    `;
  });
}

function getRemainingTime(due) {
  let diff = new Date(due) - new Date();
  if (diff <= 0) return "Time's up! ⏰";

  let d = Math.floor(diff / (1000 * 60 * 60 * 24));
  let h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  let m = Math.floor((diff / (1000 * 60)) % 60);
  let s = Math.floor((diff / 1000) % 60);

  return `${d}d ${h}h ${m}m ${s}s`;
}

setInterval(() => {
  tasks.forEach((_, i) => {
    let t = document.getElementById(`time-${i}`);
    if (t) t.innerText = getRemainingTime(tasks[i].due);
  });
}, 1000);

function toggleComplete(i) {
  tasks[i].completed = !tasks[i].completed;
  saveTasks();
  displayTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  saveTasks();
  displayTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

displayTasks();