!(function () {
  const tasks = document.getElementById("tasks");
  const diplom = document.getElementById("diplom");
  const tasksBlocks = document.querySelectorAll(".tasks-block");
  const diplomBlock = document.getElementById("diplomBlock");
  const burger = document.getElementById("burger");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const body = document.getElementById("body");

  tasks.onclick = function () {
    diplom.classList.remove("active");
    this.classList.add("active");

    tasksBlocks.forEach((block) => {
      block.classList.remove("hidden");
    });

    diplomBlock.classList.add("hidden");
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
  };

  diplom.onclick = function () {
    tasks.classList.remove("active");
    this.classList.add("active");

    tasksBlocks.forEach((block) => {
      block.classList.add("hidden");
    });

    diplomBlock.classList.remove("hidden");
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
  };

  burger.onclick = function () {
    body.classList.toggle("overflow");
    overlay.classList.toggle("show");
    sidebar.classList.toggle("show");
  };
})();
