const keys = document.querySelectorAll(".key");

function removeTransition(event) {
  if (event.propertyName !== "transform") return;
  event.target.classList.remove("playing");
}

function playSound(event) {
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
  if (!audio) return;

  key.classList.add("playing");
  audio.play();
  audio.currentTime = 0;
}

keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);
