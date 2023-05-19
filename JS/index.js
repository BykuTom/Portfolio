/*Type Writer*? */
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
/*End of typewriter */
/* Section Observer*/
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {});
});

/*End of section Onserver */
/* header background*/
const canvas = document.querySelector(".header-background");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.fillStyle = "#00a7e1";
class Metaball {
  constructor(effect) {
    this.effect = effect;
    this.x = this.effect.width * 0.5;
    this.y = this.effect.height * 0.5;
    this.radius = Math.random() * 200 + 50;
    this.speedX = Math.random() - 0.5;
    this.SpeedY = Math.random() - 0.5;
  }
  update() {
    if (this.x < this.radius || this.x > this.effect.width - this.radius)
      this.speedX *= -1;
    if (this.y < this.radius || this.y > this.effect.height - this.radius)
      this.SpeedY *= -1;
    this.x += this.speedX;
    this.y += this.SpeedY;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}
class MetaballsEffect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.metaBallsArray = [];
  }
  init(numberOfBalls) {
    for (let i = 0; i < numberOfBalls; i++) {
      this.metaBallsArray.push(new Metaball(this));
    }
  }
  update() {
    this.metaBallsArray.forEach((ball) => ball.update());
  }
  draw(context) {
    this.metaBallsArray.forEach((ball) => ball.draw(context));
  }
}

const effect = new MetaballsEffect(canvas.width, canvas.height);
effect.init(20);
function animateMetaballs() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  effect.update();
  effect.draw(context);
  requestAnimationFrame(animateMetaballs);
}
animateMetaballs();
/*End of header background*/

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
