let socket = io("http://localhost:5050", { path: "/real-time" });

document.getElementById("turn-on-button").addEventListener("click", turnOnLed);
document.getElementById("turn-off-button").addEventListener("click", turnOffLed);

const square = document.querySelector("#square");
const buttonStatus = document.querySelector("#button-status");
const lightImage = document.querySelector("#light-image");

// URLs de las imágenes
const lightImageUrl = "https://i.pinimg.com/736x/84/2c/e8/842ce8672117f17865a17c83aba8e0c0.jpg";
const darkImageUrl = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/705ec2f1-52a5-474d-a902-28537c49d394/df6u89d-d9212170-aa9b-46e3-bddf-343ce96a5c56.jpg/v1/fill/w_480,h_360,q_75,strp/when_the_mr_incredible_becoming_memes_are_dead_by_ivanjuniorstudios_df6u89d-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzYwIiwicGF0aCI6Ii9mLzcwNWVjMmYxLTUyYTUtNDc0ZC1hOTAyLTI4NTM3YzQ5ZDM5NC9kZjZ1ODlkLWQ5MjEyMTcwLWFhOWItNDZlMy1iZGRmLTM0M2NlOTZhNWM1Ni5qcGciLCJ3aWR0aCI6Ijw9NDgwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.gCIWp93lc95raYtMpCY7KELRGTjQnSypzao4B0S6Pks";

async function turnOnLed() {
  socket.emit("turn-on");
}

async function turnOffLed() {
  socket.emit("turn-off");
}

socket.on("porValue", (data) => {
  console.log("Data received:", data);

  // Actualizar el tamaño del cuadrado con el potenciómetro
  square.style.width = data?.potValue + "px";

  // Actualizar el estado del botón
  if (data?.buttonState === 1) {
    buttonStatus.textContent = "Botón: PRESIONADO";
    buttonStatus.style.color = "green";
  } else {
    buttonStatus.textContent = "Botón: NO PRESIONADO";
    buttonStatus.style.color = "red";
  }

  // Mostrar imagen según la luz (threshold = 600)
  if (data?.lightVal > 600) {
    lightImage.src = lightImageUrl; // Luz fuerte
  } else {
    lightImage.src = darkImageUrl; // Sombra
  }
});
