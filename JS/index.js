/*Jquery Isotope*/

$(".grid").isotope({
  layoutMode: "fitRows",
  itemSelector: ".grid-item",
  transitionDuration: "0.6s",
});

/*End of Jquery Isotope*/

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
    blinker.style.opacity = "1";
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
const record_wrap = document.querySelector(".records");
const records_numbers = document.querySelectorAll(".number");
const record_Circles = document.querySelectorAll(".record-circle");

record_Circles.forEach((circle) => circle.classList.remove("active"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("visibile");
        records_numbers.forEach((number) => {
          const UpdateCount = () => {
            let currentNumber = Number(number.innerText);
            let maximumNumber = Number(number.dataset.number);
            const increment = Math.ceil(Math.sqrt(maximumNumber) / 15);
            if (currentNumber < maximumNumber) {
              number.innerText = currentNumber + increment;
              setTimeout(UpdateCount, 1);
            } else {
              number.innerText = maximumNumber;
            }
          };
          record_Circles.forEach((circle) => circle.classList.add("active"));
          setTimeout(UpdateCount, 200);
        });
      }
    });
  },
  { threshold: 0.7 }
);

const config = {
  root: null, // Use the viewport as the root element
  threshold: 1, // Trigger the observer callback when the element is 50% visible
};
observer.root = null;
observer.threshold = 1;
observer.observe(record_wrap);

RecordsCounter = () => {
  records_number.forEach();

  animatedText.textContent = typeWriterText[arrayIndex].substring(0, textIndex);

  if (textIndex++ != typeWriterText[arrayIndex].length) {
    setTimeout(typeWriter, delay);
  } else {
    blinker.style.animationPlayState = "running";
    textLenght = typeWriterText[arrayIndex].length + 1;
    setTimeout(textRemover, 3000);
  }
};
/*End of section Onserver */
/* header background*/
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

let w, h, particles;
let particleDistance = 64;
let mouse = {
  x: undefined,
  y: undefined,
  radius: 128,
};

function init() {
  resizeReset();
  animationLoop();
}

function resizeReset() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  particles = [];
  for (
    let y =
      (((h - particleDistance) % particleDistance) + particleDistance) / 2;
    y < h;
    y += particleDistance
  ) {
    for (
      let x =
        (((w - particleDistance) % particleDistance) + particleDistance) / 2;
      x < w;
      x += particleDistance
    ) {
      particles.push(new Particle(x, y));
    }
  }
}

function animationLoop() {
  ctx.clearRect(0, 0, w, h);
  drawScene();
  // console.log("im here");
  setTimeout(animationLoop, 12);
}

function drawScene() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  drawLine();
}

function drawLine() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < particleDistance * 2) {
        opacity = 1 - distance / (particleDistance * 1.25);
        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0.16, "#4a4a4a64");
        gradient.addColorStop(0.32, "#5a5a5a64");
        gradient.addColorStop(0.5, "#fffdf796");
        gradient.addColorStop(0.68, "#5a5a5a64");
        gradient.addColorStop(0.84, "#4a4a4a64");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function mousemove(e) {
  mouse.x = e.x;
  mouse.y = e.y;
}

function mouseout() {
  mouse.x = undefined;
  mouse.y = undefined;
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 2;
    this.baseX = this.x;
    this.baseY = this.y;
    this.speed = Math.random() * 25 + 5;
  }
  draw() {
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0.16, "#3c3c3c64");
    gradient.addColorStop(0.32, "#fffdf764");
    gradient.addColorStop(0.68, "#fffdf764");
    gradient.addColorStop(0.84, "#3c3c3c64");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance; // 0 ~ 1
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let directionX = forceDirectionX * force * this.speed;
    let directionY = forceDirectionY * force * this.speed;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

init();
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);

/*End of header background*/

window.addEventListener("load", typeWriter);

const filter_buttons = document.querySelectorAll(".filter-button");

console.log(filter_buttons);

filter_buttons.forEach((btn) =>
  btn.addEventListener("click", () => {
    filter_buttons.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    let filterValue = btn.dataset.filter;

    $(".grid").isotope({
      filter: filterValue,
    });
  })
);

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
