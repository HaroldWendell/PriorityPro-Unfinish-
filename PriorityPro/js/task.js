const addButton = document.getElementById("ADDTASKBTN");
const taskContainer = document.querySelector(".taskContainer");
const addTaskContainer = document.querySelector(".addTaskContainer");
const headerPage1 = document.getElementById("headerPage1");
const headerPage2 = document.getElementById("headerPage2");

addButton.addEventListener("click", () => {
  const taskAddButton = document.getElementById("addTaskBtn");
  const taskModButton = document.getElementById("modifyBtn");
  taskContainer.style.display = "none";
  addTaskContainer.style.display = "block";

  headerPage1.style.display = "none";
  headerPage2.style.display = "block";

  taskAddButton.style.display = "block";
  taskModButton.style.display = "none";
});

function goBack() {
  taskContainer.style.display = "block";
  addTaskContainer.style.display = "none";

  headerPage1.style.display = "block";
  headerPage2.style.display = "none";
}

let tasks = [];
let history = [];

function addReminder(reminderText) {
  const reminderList = document.getElementById("reminderList");
  const listItem = document.createElement("li");
  listItem.textContent = reminderText;
  reminderList.appendChild(listItem);
}

function displayReminders() {
  const today = new Date().toLocaleDateString("en-US");

  tasks.forEach((task) => {
    if (task.reminder !== "none" && isDateWithinDays(task.deadline, 1) && isWithinReminderTimeAndNear(task.deadline, task.reminder, 30)) {
      addReminder(`Task: ${task.text} - ${formatReminder(task.reminder)}`);
    }
  });
}

// Function to save the tasks and history in localStorage
function saveData() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('history', JSON.stringify(history));
}

// Function to load the tasks and history from localStorage
function loadData() {
  const tasksJSON = localStorage.getItem('tasks');
  const historyJSON = localStorage.getItem('history');
  tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
  history = historyJSON ? JSON.parse(historyJSON) : [];
  displayReminders();
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const notesInput = document.getElementById("notesInput");
  const deadlineInput = document.getElementById("deadlineInput");
  const timeInput = document.getElementById("timeInput");
  const reminderInput = document.getElementById("reminderInput");
  const categoryInput = document.getElementById("categoryInput");
  const priorityInput = document.getElementById("priorityInput");

  const taskText = taskInput.value.trim().toUpperCase();
  const notes = notesInput.value;
  const deadline = deadlineInput.value;
  const time = timeInput.value.trim() || "00:00";
  const reminder = reminderInput.value === "" ? "none" : reminderInput.value;
  const category = categoryInput.value;
  const priority = priorityInput.value;

  if (taskText === "" || category === "") return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    notes: notes,
    deadline: deadline + " " + time,
    reminder: reminder,
    category: category,
    priority: priority,
    done: false,
  };

  tasks.push(newTask);
  saveData();
  displayReminders();
  renderTasks();
  alert("You have successfully added a task!");
  taskInput.value = "";
  notesInput.value = "";
  deadlineInput.value = "";
  timeInput.value = "";
  reminderInput.value = "none";
  categoryInput.value = "";
  renderTaskCounts();
}

function toggleDone(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.done = !task.done;
    saveData();
    renderTaskCounts();
    renderTasks();
    renderStatistics();
    displayReminders();
  }
}

function moveToHistory(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.done = false;
    history.push(task);
    tasks = tasks.filter((task) => task.id !== id);
    renderTaskCounts();
    saveData();
    renderTasks();
    renderHistory();
    renderStatistics();
    displayReminders();
  }
}

function undoTask(id) {
  const task = history.find((task) => task.id === id);
  if (task) {
    task.done = false;
    tasks.push(task);
    history = history.filter((task) => task.id !== id);
    saveData();
    renderTaskCounts();
    renderTasks();
    renderHistory();
    renderStatistics();
    
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveData();
  renderTaskCounts();
  renderTasks();
  renderStatistics();
  displayReminders();
}

function editTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    const taskInput = document.getElementById("taskInput");
    const notesInput = document.getElementById("notesInput");
    const deadlineInput = document.getElementById("deadlineInput");
    const timeInput = document.getElementById("timeInput");
    const reminderInput = document.getElementById("reminderInput");
    const categoryInput = document.getElementById("categoryInput");
    const priorityInput = document.getElementById("priorityInput");
    const taskAddButton = document.getElementById("addTaskBtn");
    const taskModButton = document.getElementById("modifyBtn");
    const taskContainer = document.querySelector(".taskContainer");
    const addTaskContainer = document.querySelector(".addTaskContainer");

    taskInput.value = task.text;
    notesInput.value = task.notes;
    deadlineInput.value = task.deadline.split(" ")[0];
    timeInput.value = task.deadline.split(" ")[1] || "00:00";
    reminderInput.value = task.reminder;
    categoryInput.value = task.category;
    priorityInput.value = task.priority;

    taskAddButton.style.display = "none";
    taskModButton.style.display = "block";

    taskModButton.addEventListener("click", function () {
      updateTask(id);
      taskModButton.textContent = "Add Task";

      alert("You have successfully modified a task!");

      window.location.reload();
    });

    taskContainer.style.display = "none";
    addTaskContainer.style.display = "block";
    headerPage1.style.display = "none";
    headerPage2.style.display = "block";
  }
}

function updateTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    const taskInput = document.getElementById("taskInput");
    const notesInput = document.getElementById("notesInput");
    const deadlineInput = document.getElementById("deadlineInput");
    const timeInput = document.getElementById("timeInput");
    const reminderInput = document.getElementById("reminderInput");
    const categoryInput = document.getElementById("categoryInput");
    const priorityInput = document.getElementById("priorityInput");

    const taskText = taskInput.value.trim().toUpperCase();
    const notes = notesInput.value;
    const deadline = deadlineInput.value;
    const time = timeInput.value.trim() || "00:00";
    const reminder = reminderInput.value === "" ? "none" : reminderInput.value;
    const category = categoryInput.value;
    const priority = priorityInput.value;

    if (taskText === "" || category === "") return;

    task.text = taskText;
    task.notes = notes;
    task.deadline = deadline + " " + time;
    task.reminder = reminder;
    task.category = category;
    task.priority = priority;

    saveData();
  }
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    
    const reminderMessage = document.getElementById("reminderMessage");
    reminderMessage.innerHTML = ""; // Clear previous reminder message
  
    const dateFormatter = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" });
    const timeFormatter = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "numeric", hour12: true });
  
    tasks.forEach((task) => {
      const listItem = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.addEventListener("change", () => toggleDone(task.id));
  
      const deadlineDate = new Date(task.deadline);
      const formattedDeadlineDate = dateFormatter.format(deadlineDate);
      const formattedTime = timeFormatter.format(deadlineDate);
  
      listItem.innerHTML += `
        <div class='taskLists'>
          <span${task.done ? '"' : ''}>${task.text} <br> <br>Deadline: ${formattedDeadlineDate} <br> Time: ${formattedTime}</span> <br>
          <span> Category: ${toSentenceCase(task.category)}</span><br>
          <span> Priority: ${toSentenceCase(task.priority)}</span><br><br>
          ${task.reminder !== "none" && isWithinReminderTimeAndNear(task.deadline, task.reminder, 30)
            ? `<span style="color: #ff1a1e;"> Reminder: ${formatReminder(task.reminder)} - Deadline is near!</span><br>`
            : ""}<br>
          <button class='deleteBtn' onclick="deleteTask(${task.id})">Delete</button>
          <button class='editBtn' onclick="editTask(${task.id})">Edit</button>
          <button class='doneBtn' onclick="moveToHistory(${task.id})">Done</button>
        </div>
      `;
  function getRemainingTasksCount() {
  return tasks.filter(task => !task.done).length;
}

function getCompletedTasksCount() {
  return tasks.filter(task => task.done).length;
}

function renderStatistics() {
  const remainingTasksCountElement = document.getElementById("remainingTasksCount");
  const completedTasksCountElement = document.getElementById("completedTasksCount");

  const remainingTasksCount = getRemainingTasksCount();
  const completedTasksCount = getCompletedTasksCount();

  remainingTasksCountElement.textContent = remainingTasksCount;
  completedTasksCountElement.textContent = completedTasksCount;
}
      taskList.appendChild(listItem);
    });
  }
function toSentenceCase(str) {
    if (!str || typeof str !== "string") return str;
  
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  function isWithinReminderTimeAndNear(dateString, reminder, minutes) {
    const deadline = new Date(dateString).getTime();
    const now = new Date().getTime();
  
    // Calculate the deadline minus the reminder time
    const reminderTime = now + getReminderTime(reminder);
  
    // Check if the deadline is within the specified time frame (minutes) from the reminder time
    return deadline <= reminderTime + minutes * 60 * 1000;
  }
  function getReminderTime(reminder) {
    switch (reminder) {
      case "10mins":
        return 10 * 60 * 1000;
      case "1hour":
        return 60 * 60 * 1000;
      case "1day":
        return 24 * 60 * 60 * 1000;
      default:
        return 0;
    }
  }
  function renderHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
  
    history.forEach((task) => {
      const listItem = document.createElement("li");
      const deadlineDate = new Date(task.deadline);
      const formattedDeadlineDate = formatDate(deadlineDate);
      const formattedTime = formatTime(deadlineDate);

      listItem.innerHTML = `
        <div class='taskLists'><br>
          <span${task.done ? '"' : ''}>${task.text} <br> <br>Deadline: ${formattedDeadlineDate} <br> Time: ${formattedTime}</span><br>
          <span> Category: ${toSentenceCase(task.category)}</span><br>
          <span> Priority: ${toSentenceCase(task.priority)}</span><br><br>
          <button class='undoBtn' onclick="undoTask(${task.id})">Undo</button>
          <button class='deleteBtn' onclick="deleteTaskFromHistory(${task.id})">Delete</button>
        </div>
      `;
  
      historyList.appendChild(listItem);
    });
  }
  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  function formatTime(date) {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  }  
  function deleteTaskFromHistory(id) {
    history = history.filter((task) => task.id !== id);
    saveData();
    renderHistory();
  }
function formatReminder(reminder) {
  switch (reminder) {
    case "none":
      return "No Reminder";
    case "10mins":
      return "10 Minutes Before";
    case "1hour":
      return "1 Hour Before";
    case "1day":
      return "1 Day Before";
    default:
      return "No Reminder";
  }
}
function isDateWithinDays(dateString, days) {
  const date = new Date(dateString);
  const today = new Date();
  const differenceInTime = today.getTime() - date.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays <= days;
}
function getRemainingTasksCount() {
    return tasks.filter((task) => !task.done).length;
  }

  function getCompletedTasksCount() {
    return history.length;
  }

  function renderTaskCounts() {
    const remainingCount = getRemainingTasksCount();
    const completedCount = getCompletedTasksCount();

    const remainingCountElement = document.getElementById("remainingTasksCount");
    const completedCountElement = document.getElementById("completedTasksCount");

    remainingCountElement.textContent = remainingCount;
    completedCountElement.textContent = completedCount;
  }
  
loadData();
renderTasks();
renderTaskCounts();
renderHistory();
renderStatistics();






// dito ung hide ng links sa nav
function showSection(sectionId) {
const sections = document.querySelectorAll("section");
const navigationLinks = document.querySelectorAll("nav a");

// Hide all sections
sections.forEach(function(section) {
  section.style.display = "none";
});

// Remove "active" class from all navigation links
navigationLinks.forEach(function(link) {
  link.classList.remove("active");
});

// Show the selected section
const selectedSection = document.querySelector(`#${sectionId}`);
if (selectedSection) {
  selectedSection.style.display = "block";
}

// Add "active" class to the clicked navigation link
const clickedLink = document.querySelector(`a[href="#${sectionId}"]`);
if (clickedLink) {
  clickedLink.classList.add("active");
}
}



