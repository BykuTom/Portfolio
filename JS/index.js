const animatedText = document.querySelector(".end-text");

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
  if (arrayIndex >= 3) {
    arrayIndex = 0;
    console.log("array index:" + arrayIndex);
  }
  animatedText.textContent = typeWriterText[arrayIndex].substring(0, textIndex);
  console.log("Im here");
  if (textIndex++ != typeWriterText[arrayIndex].length) {
    setTimeout(typeWriter, delay);
  } else {
    textLenght = typeWriterText[arrayIndex].length + 1;
    setTimeout(textRemover, 3000);
  }
};

textRemover = () => {
  console.log(textLenght);
  strings = animatedText.textContent.slice(0, textLenght);
  animatedText.textContent = strings;
  console.log(strings);
  if (textLenght != -1) {
    textLenght--;
    setTimeout(textRemover, deleteDelay);
  } else {
    arrayIndex = arrayIndex + 1;
    textIndex = 0;
    setTimeout(typeWriter, 200);
  }
};

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
