let timer;
let elapsed = 0;
let running = false;

function formatTime(ms) {
  let date = new Date(ms);
  let hours = String(date.getUTCHours()).padStart(2, "0");
  let minutes = String(date.getUTCMinutes()).padStart(2, "0");
  let seconds = String(date.getUTCSeconds()).padStart(2, "0");
  let milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  document.getElementById("display").innerText = formatTime(elapsed);
}

document.getElementById("start").addEventListener("click", function () {
  if (!running) {
    running = true;
    let startTime = Date.now() - elapsed;
    timer = setInterval(function () {
      elapsed = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
});

document.getElementById("lap").addEventListener("click", function () {
  if (running) {
    let lapTime = formatTime(elapsed);
    let lapElement = document.createElement("li");
    lapElement.className = "list-group-item";
    lapElement.innerText = lapTime;
    document.getElementById("laps").appendChild(lapElement);
  }
});

document.getElementById("stop").addEventListener("click", function () {
  if (running) {
    running = false;
    clearInterval(timer);
  }
});

document.getElementById("reset").addEventListener("click", function () {
  running = false;
  clearInterval(timer);
  elapsed = 0;
  updateDisplay();
  document.getElementById("laps").innerHTML = "";
});
