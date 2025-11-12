let socket = io("http://localhost:5050", { path: "/real-time" });

document.getElementById("turn-on-button").addEventListener("click", turnOnLed);
document.getElementById("turn-off-button").addEventListener("click", turnOffLed);
const square = document.querySelector("#square");
const buttonStatus = document.querySelector("#button-status");

async function turnOnLed() {
  socket.emit("turn-on");
}

async function turnOffLed() {
  socket.emit("turn-off");
}

socket.on("porValue", (data) => {
  console.log(data);
  
  // Actualizar el tamaño del cuadrado con el potenciómetro
  square.style.width = data?.potValue + "px";
  
  // Actualizar el estado del botón
  if (data?.buttonState === 0) {
    buttonStatus.textContent = "Botón: PRESIONADO";
    buttonStatus.style.color = "green";
  } else {
    buttonStatus.textContent = "Botón: NO PRESIONADO";
    buttonStatus.style.color = "red";
  }
});