let socket = io("http://localhost:5050", { path: "/real-time" });

document.getElementById("turn-on-button").addEventListener("click", turnOnLed);
document.getElementById("turn-off-button").addEventListener("click", turnOffLed);
const square = document.querySelector("#square");

async function turnOnLed() {
  socket.emit("turn-on"); // Sends a string message to the server
}

async function turnOffLed() {
  socket.emit("turn-off"); // Sends a string message to the server
}

socket.on("porValue", (data) => {
  console.log(data);
  square.style.width = data?.potValue + "px";
});
