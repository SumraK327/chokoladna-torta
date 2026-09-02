export const Todo = () => {
  const STORAGE_KEY = "todo-dates";

  const dateInput = document.querySelector(".todo__date-input");
  const addDateBtn = document.querySelector(".todo__add-date-btn");
  const dateList = document.querySelector(".todo__date-list");

  const taskInput = document.querySelector(".todo__input");
  const addTaskBtn = document.querySelector(".todo__add-btn");
  const taskList = document.querySelector(".todo__list");

  const counterValue = document.querySelector(".todo__counter-value");
  const clearDoneBtn = document.querySelector(".todo__clear-done");

  let currentDate = null;
  let dates = {};

  const loadDates = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      dates = saved ? JSON.parse(saved) : {};
    } catch {
      dates = {};
    }
  };

  const saveDates = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dates));
  };

  const renderDateTabs = () => {
    dateList.innerHTML = "";

    Object.keys(dates).forEach((date) => {
      const item = document.createElement("li");
      item.className = "todo__date-item";

      const link = document.createElement("button");
      link.className =
        "todo__date-link" +
        (date === currentDate ? " todo__date-link--active" : "");
      link.textContent = date;
      link.addEventListener("click", () => {
        currentDate = date;
        render();
      });

      const del = document.createElement("button");
      del.className = "todo__date-delete";
      del.setAttribute("aria-label", "Удалить дату");
      del.textContent = "✕";
      del.addEventListener("click", () => {
        delete dates[date];
        if (currentDate === date) currentDate = null;
        saveDates();
        render();
      });

      item.append(link, del);
      dateList.append(item);
    });
  };

  const renderTasks = () => {
    taskList.innerHTML = "";

    if (!currentDate || !dates[currentDate]) {
      taskList.innerHTML =
        '<li class="todo__item"><span class="todo__text">Выберите или добавьте дату</span></li>';
      updateCounter();
      return;
    }

    const tasks = dates[currentDate];

    tasks.forEach((task, index) => {
      const item = document.createElement("li");
      item.className = "todo__item";

      const number = document.createElement("span");
      number.className = "todo__number";
      number.textContent = index + 1;

      const checkbox = document.createElement("button");
      checkbox.className = "todo__checkbox" + (task.done ? " done" : "");
      checkbox.setAttribute("aria-label", "Выполнить задачу");
      checkbox.addEventListener("click", () => {
        task.done = !task.done;
        saveDates();
        render();
      });

      const text = document.createElement("span");
      text.className = "todo__text" + (task.done ? " done" : "");
      text.textContent = task.text;

      const del = document.createElement("button");
      del.className = "todo__delete";
      del.setAttribute("aria-label", "Удалить задачу");
      del.textContent = "✕";
      del.addEventListener("click", () => {
        dates[currentDate].splice(index, 1);
        saveDates();
        render();
      });

      item.append(number, checkbox, text, del);
      taskList.append(item);
    });

    updateCounter();
  };

  const updateCounter = () => {
    if (!currentDate || !dates[currentDate]) {
      counterValue.textContent = "0";
      return;
    }

    const active = dates[currentDate].filter((task) => !task.done).length;
    counterValue.textContent = active;
  };

  const render = () => {
    renderDateTabs();
    renderTasks();
  };

  const addDate = () => {
    const value = dateInput.value;

    if (!value) {
      alert("Выберите дату");
      return;
    }

    // Конвертируем ГГГГ-ММ-ДД → ДД.ММ.ГГГГ
    const [year, month, day] = value.split("-");
    const formatted = `${day}.${month}.${year}`;

    if (!dates[formatted]) {
      dates[formatted] = [];
    }

    currentDate = formatted;
    dateInput.value = "";
    saveDates();
    render();
  };

  const addTask = () => {
    const value = taskInput.value.trim();

    if (!value) {
      alert("Введите текст задачи");
      return;
    }

    if (!currentDate) {
      alert("Сначала выберите или добавьте дату");
      return;
    }

    dates[currentDate].push({ text: value, done: false });
    taskInput.value = "";
    saveDates();
    render();
  };

  const clearDone = () => {
    if (!currentDate || !dates[currentDate]) return;

    const confirmClear = confirm("Удалить все выполненные задачи?");

    if (!confirmClear) return;

    dates[currentDate] = dates[currentDate].filter((task) => !task.done);
    saveDates();
    render();
  };

  // События
  addDateBtn.addEventListener("click", addDate);
  dateInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addDate();
  });

  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });

  clearDoneBtn.addEventListener("click", clearDone);

  // Старт
  loadDates();

  if (Object.keys(dates).length > 0) {
    currentDate = Object.keys(dates)[0];
  }
  const dateResetBtn = document.querySelector(".todo__date-reset");

  dateResetBtn.addEventListener("click", () => {
    dateInput.value = "";
    dateInput.focus();
  });

  render();
};
