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
/* Header Section Observer*/
const headerTitle = document.querySelector(".header-title");
const begginingSubText = document.querySelector(".beggining-text");
const socialLinkIconsNodeList = document.querySelectorAll(".social-links"); // grab nodelist
const socialLinkIconsArray = [...socialLinkIconsNodeList]; // use spread operator to convert it into an array
const subText = "A Professional";
const myName = "Tomasz Wolak";
let headerTextIndex = 0;
let subTextIndex = 1;
let socialLinkIndex = 0;
/* const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting){

    }
  });
},
{ threshold: 1 }
); */
socialLinkLoader = () => {
  console.log(socialLinkIconsArray[socialLinkIndex]);

  socialLinkIconsArray[socialLinkIndex].style.opacity = 1;
  socialLinkIconsArray[socialLinkIndex].style.bottom = "0px";

  if (socialLinkIndex != socialLinkIconsArray.length - 1) {
    socialLinkIndex++;
    setTimeout(socialLinkLoader, 100);
  }
};

headerTypeWriter = () => {
  headerTitle.textContent = myName.substring(0, headerTextIndex);

  if (headerTextIndex != myName.length) {
    headerTextIndex++;
    setTimeout(headerTypeWriter, delay / 2);
  } else {
    begginingSubText.textContent = subText.substring(0, subTextIndex);

    if (subTextIndex++ != subText.length) {
      setTimeout(headerTypeWriter, delay);
    } else {
      socialLinkLoader();
      typeWriter();
    }
  }
};
//typeWriter();
/*End of Header Section Observer*/
/* About-me Section Observer*/
const aboutMeImage = document.querySelector(".image");
const aboutMeTitle = document.querySelector(".about-me-title");
const aboutMeText = document.querySelector(".about-me-text");
const aboutMeWrapper = document.querySelector(".about-me-column2-wrapper");
const cvButton = document.querySelector(".cv-button");

const aboutMeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutMeImage.style.animationPlayState = "running";
        aboutMeImage.style.opacity = "1";
        aboutMeImage.style.left = "0px";
        aboutMeTitle.style.opacity = "1";
        aboutMeTitle.style.top = "0px";
        aboutMeText.style.opacity = "1";
        aboutMeText.style.right = "0px";
        aboutMeWrapper.style.opacity = "1";
        aboutMeWrapper.style.bottom = "0px";
        cvButton.style.opacity = "1";
        cvButton.style.bottom = "0px";
      }
    });
  },
  { threshold: 0.5 }
);

aboutMeObserver.observe(aboutMeImage);

/*End of About-me section Onserver */
/* Record Section Observer*/
const record_wrap = document.querySelector(".records");
const records_numbers = document.querySelectorAll(".number");
const record_Circles = document.querySelectorAll(".record-circle");

record_Circles.forEach((circle) => circle.classList.remove("active"));

const recordsObserver = new IntersectionObserver(
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
  { threshold: 1 }
);

recordsObserver.observe(record_wrap);

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
/*End of Record section Onserver */
/* header background*/
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

let w, h, particles;
let particleDistance = 64;
let mouse = {
  x: undefined,
  y: undefined,
  radius: 96,
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

  setTimeout(animationLoop, 10);
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

      if (distance < particleDistance * 1.768) {
        opacity = 1 - distance / (particleDistance * 2.64);
        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0.1, "#4c787e64");
        gradient.addColorStop(0.26, "#31905664");
        gradient.addColorStop(0.34, "#ff964f64");
        gradient.addColorStop(0.42, "#ff964f96");
        gradient.addColorStop(0.5, "#e9542696");
        gradient.addColorStop(0.58, "#ff964f96");
        gradient.addColorStop(0.66, "#ff964f64");
        gradient.addColorStop(0.74, "#31905664");
        gradient.addColorStop(0.9, "#4c787e64");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.16;
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
    this.size = 1.64;
    this.baseX = this.x;
    this.baseY = this.y;
    this.speed = Math.random() * 20 + 5;
  }
  draw() {
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0.1, "#4c787e64");
    gradient.addColorStop(0.26, "#31905664");
    gradient.addColorStop(0.34, "#ff964f64");
    gradient.addColorStop(0.42, "#ff964f96");
    gradient.addColorStop(0.5, "#e9542696");
    gradient.addColorStop(0.58, "#ff964f96");
    gradient.addColorStop(0.66, "#ff964f64");
    gradient.addColorStop(0.74, "#31905664");
    gradient.addColorStop(0.9, "#4c787e64");
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

window.addEventListener("load", headerTypeWriter);

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
