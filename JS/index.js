const animatedText = document.querySelector(".end-text");
const blinker = document.querySelector(".blinker");

const typeWriterText = [
  "Software Engineer",
  "Front-End Developer",
  "Web Developer",
];
let arrayIndex = 0;
let textIndex = 0;
let delay = 100;
let deleteDelay = 25;
let strings;
let textLenght;

typeWriter = () => {
  if (blinker.style.animationPlayState === "running") {
    blinker.style.animationPlayState = "paused";
    console.log(blinker.style.opacity);
    blinker.style.opacity = "1";
    console.log(blinker.style.opacity);
  }
  if (arrayIndex >= 3) {
    arrayIndex = 0;
  }

  animatedText.textContent = typeWriterText[arrayIndex].substring(0, textIndex);

  if (textIndex++ != typeWriterText[arrayIndex].length) {
    setTimeout(typeWriter, delay);
  } else {
    blinker.style.animationPlayState = "running";
    textLenght = typeWriterText[arrayIndex].length + 1;
    setTimeout(textRemover, 3000);
  }
};

textRemover = () => {
  if (blinker.style.animationPlayState === "running") {
    blinker.style.animationPlayState = "paused";
    console.log(blinker.style.opacity);
    blinker.style.opacity = "1";
    console.log(blinker.style.opacity);
  }
  strings = animatedText.textContent.slice(0, textLenght);
  animatedText.textContent = strings;

  if (textLenght != -1) {
    textLenght--;
    setTimeout(textRemover, deleteDelay);
  } else {
    arrayIndex = arrayIndex + 1;
    textIndex = 0;
    setTimeout(typeWriter, 200);
  }
};

function reset_animation() {
  blinker.style.animation = "none";
  blinker.offsetHeight; /* trigger reflow */
  blinker.style.animation = null;
}
window.addEventListener("load", typeWriter);

/* const loadAnimatedText = () => {
  setTimeout(() => {
    animatedText.textContent = "Software Engineer";
  }, 0);
  setTimeout(() => {
    animatedText.textContent = "Front End Developer";
  }, 4500);
  setTimeout(() => {
    animatedText.textContent = "Web Developer";
  }, 9000);
};

loadAnimatedText();
setInterval(loadAnimatedText, 13500); */
