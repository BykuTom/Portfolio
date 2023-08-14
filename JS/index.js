/*Jquery Isotope*/

$(".grid").isotope({
  layoutMode: "fitRows",
  itemSelector: ".grid-item",
  transitionDuration: "0.6s",
});

/*End of Jquery Isotope*/

/*Navburger Menu*/
const navBurger = document.querySelector(".hamburger-menu");
const navList = document.querySelector(".nav-list");

navBurger.addEventListener("click", () => {
  if (navBurger.classList.contains("is-active")) {
    navBurger.classList.remove("is-active");
    navList.classList.remove("is-active");
  } else {
    navBurger.classList.add("is-active");
    navList.classList.add("is-active");
  }
});
//Maybe make an array and use foreach function?
/*End of NavBurger Menu*/

/*Type Writer*? */
const animatedText = document.querySelector(".end-text");
const blinker = document.querySelector(".blinker");

const typeWriterText = [
  "Front-End Developer }",
  "Software Engineer }",
  "Web Developer }",
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
    //console.log(blinker.style.opacity);
    blinker.style.opacity = "1";
    //console.log(blinker.style.opacity);
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
const subText = "{ A Professional";
const myName = "Tomasz Wolak";
let headerTextIndex = 0;
let subTextIndex = 1;
let socialLinkIndex = 0;

socialLinkLoader = () => {
  //console.log(socialLinkIconsArray[socialLinkIndex]);

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
    socialLinkLoader();
    if (subTextIndex++ != subText.length) {
      setTimeout(headerTypeWriter, delay);
    } else {
      typeWriter();
    }
  }
};

/*End of Header Section Observer*/
/* About-me Section Observer*/

/* Intersection Observers */

const aboutMeBox = document.querySelector(".about-me");
const aboutMeImage = document.querySelector(".image-wrap");
const aboutMeTitle = document.querySelector(".about-me-title");
const aboutMeText = document.querySelector(".about-me-text");
const aboutMeButtons = document.querySelector(".about-me-buttons");
const cvButton = document.querySelector(".cv-button");

const techstackIconTray = document.querySelector(".tech-stack-icon-container");
const techstackIconsNodeList = document.querySelectorAll(".tech-stack-icons");
const techstackIconArray = [...techstackIconsNodeList];
let techstackIconIndex = 0;

techstackIconLoader = () => {
  //console.log(techstackIconArray[techstackIconIndex]);

  techstackIconArray[techstackIconIndex].style.opacity = 1;
  techstackIconArray[techstackIconIndex].style.left = "0px";
  if (techstackIconIndex != techstackIconArray.length - 1) {
    techstackIconIndex++;
    setTimeout(techstackIconLoader, 100);
  }
};

const aboutMeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutMeImage.style.opacity = "1";
        aboutMeImage.style.left = "0px";
        aboutMeTitle.style.opacity = "1";
        aboutMeTitle.style.top = "0px";
        aboutMeText.style.opacity = "1";
        aboutMeText.style.right = "0px";
        techstackIconTray.style.opacity = "1";
        techstackIconLoader();
        aboutMeButtons.style.opacity = "1";
        aboutMeButtons.style.bottom = "0px";
        cvButton.style.opacity = "1";
        cvButton.style.bottom = "0px";
      }
    });
  },
  { threshold: 0.16 }
);

aboutMeObserver.observe(aboutMeBox);

/*End of About-me section Onserver */
/* Record Section Observer*/
const record_wrap = document.querySelector(".records");
const records_numbers = document.querySelectorAll(".number");
const record_Circles = document.querySelectorAll(".record-circle");
const recordProgressCircles = document.querySelectorAll(".record-wrap");

let currentNumber = [0, 0, 0, 0];
let incrementSpeed = [30, 25, 35, 20];
let circleProggressNumber = 0;

record_Circles.forEach((circle) => circle.classList.remove("active"));

console.log(recordProgressCircles);

const recordsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        records_numbers.forEach((number) => {
          const UpdateCount = () => {
            let maximumNumber = Number(number.dataset.number);
            const increment =
              maximumNumber / incrementSpeed[Number(number.dataset.circle)];

            if (currentNumber[Number(number.dataset.circle)] < maximumNumber) {
              currentNumber[Number(number.dataset.circle)] =
                currentNumber[Number(number.dataset.circle)] + increment;

              number.innerText = Math.floor(
                currentNumber[Number(number.dataset.circle)]
              );

              let progressValue =
                currentNumber[Number(number.dataset.circle)] / maximumNumber;
              let progressEndValue = progressValue * 100;

              recordProgressCircles[
                number.dataset.circle
              ].style.background = `conic-gradient(#ff9500 0deg, #e95426 ${
                progressEndValue * 3.6
              }deg, #fffdf7 ${progressEndValue * 3.6}deg)`;

              setTimeout(UpdateCount, 10);
            } else {
              recordProgressCircles[
                number.dataset.circle
              ].style.background = `conic-gradient(#ff9500 0deg, #e95426 ${360}deg, #fffdf7 ${360}deg)`;
              number.innerText = maximumNumber;
            }
          };
          record_Circles.forEach((circle) => circle.classList.add("active"));
          recordProgressCircles.forEach((circle) =>
            circle.classList.add("active")
          );
          setTimeout(UpdateCount, 200);
        });
      }
    });
  },
  { threshold: 0.16 }
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
  if (w > 256) {
    particleDistance = 48;
    console.log("tru");
  }
  if (w > 1024) {
    particleDistance = 56;
    console.log("tru");
  }
  if (w > 1920) {
    particleDistance = 64;
    console.log("tru");
  }
  if (w > 2560) {
    particleDistance = 72;
    console.log("tru");
  }
  if (w > 3840) {
    particleDistance = 96;
    console.log("tru");
  }

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
    this.speed = Math.random() * 25 + 5;
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

/*End of header background*/
/*start of Portfolio filter*/

const filter_buttons = document.querySelectorAll(".filter-button");

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
/*End of Portfolio filter*/
/*End of Contact Form*/

const contactName = document.querySelector(".contact-name");
const contactNameError = document.querySelector(
  ".contact-form--message-box--contact-name"
);

const contactSurname = document.querySelector(".contact-surname");
const contactSurnameError = document.querySelector(
  ".contact-form--message-box--contact-surname"
);

const contactPhone = document.querySelector(".contact-phone");
const contactEmail = document.querySelector(".contact-email");
const contactEmailError = document.querySelector(
  ".contact-form--message-box--contact-email"
);
const contactMessage = document.querySelector(".contact-message");
const contactMessageError = document.querySelector(
  ".contact-form--message-box--contact-message"
);
const contactMessageCounter = document.querySelector(
  ".contact-message--character-counter"
);

contactName.addEventListener("input", () => {
  contactName.style.borderColor = "transparent";
});
contactSurname.addEventListener("input", () => {
  contactSurname.style.borderColor = "transparent";
});
contactEmail.addEventListener("input", () => {
  contactEmail.style.borderColor = "transparent";
});
contactMessage.addEventListener("input", () => {
  contactMessage.style.borderColor = "transparent";
});

const contactForm = document
  .querySelector(".contact-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
  });
const contactSendButton = document
  .querySelector(".contact-button")
  .addEventListener("click", () => {
    validateForm();
  });

const publickey = "ss08N86-3SfBX5n9B";
const templateID = "template_fbvebb3";
const serviceID = "service_qrqd48i";

contactMessage.addEventListener("input", function () {
  const remainingChars = 1000 - contactMessage.value.length;
  contactMessageCounter.textContent = remainingChars + " / 1000";
  if (remainingChars < 0) {
    contactMessageCounter.style.color = "#ff5a5f";
  } else if (remainingChars >= 0) {
    contactMessageCounter.style.color = "#ff9500";
  }
});

function changeOpacity(element) {
  element.style.opacity = 1;
  setTimeout(() => {
    element.style.opacity = "0";
  }, 5000);
}
function changeOpacityMK2(...elements) {
  elements.forEach((element) => {
    element.style.opacity = 1;
    setTimeout(() => {
      element.style.opacity = "0";
    }, 5000);
  });
} // hmm timing is stinky, i want to be able to decide if it needs a timing or not,
// maybe making an object class would be better?
function validateForm() {
  let boolArray = [true, true, true, true];
  let boolMap;
  /* function isArrayAllTrue(array){
    return array.every(element => element === true);
  } */
  /* try {
    if (contactName.value.length <= 2)
      throw "Name has to be longer than 2 characters";
    if (contactName.value.length >= 15)
      throw "Name has to be shorter than 15 characters";
    if (contactName.value.includes(" ")) throw "Name cannot contain any spaces";
    if (containsSpecialChars(contactName.value))
      throw "Name cannot contain any special characters";
  } catch (error) {
    boolArray[0] = false;
    contactName.innerText = error;
    changeOpacity(contactNameError);
    contactName.style.borderColor = "#ff5a5f";
  } */

  /* function validateNameInput() {
    errorMessageArray[0] = "";
    contactNameError.innerText = null;

    try {
      if (contactName.value.length <= 2)
        throw "Name has to be longer than 2 characters";
      if (contactName.value.length >= 15)
        throw "Name has to be shorter than 15 characters";
      if (contactName.value.includes(" "))
        throw "Name cannot contain any spaces";
      if (containsSpecialChars(contactName.value))
        throw "Name cannot contain any special characters";
    } catch (error) {
      boolArray[0] = false;
      errorMessageArray[0] += error;
      console.log(error);
      changeOpacity(contactNameError);
      contactName.style.borderColor = "#ff5a5f";
    }

    contactNameError.innerText = errorMessageArray[0];
  } */

  function validateNameInput() {
    contactNameError.innerText = null;
    let errorMessages = [];
    // I created the errorMessages array in order to collect all error messages
    try {
      if (contactName.value.length <= 2)
        errorMessages.push("Name has to be longer than 2 characters");
      if (contactName.value.length >= 15)
        errorMessages.push("Name has to be shorter than 15 characters");
      if (contactName.value.includes(" "))
        errorMessages.push("Name cannot contain any spaces");
      if (containsSpecialChars(contactName.value))
        errorMessages.push("Name cannot contain any special characters");
      // the following if statement checks for the lenght of the array and if its longer than 0 (1)
      // it changes the validation bull to false, changes the colour of the input border and lastly it throws a new error
      // made up from combined error messages seperated by the bew line \n
      // otherwise the border becomes white on validation
      if (errorMessages.length > 0) {
        boolArray[0] = false;
        contactName.style.borderColor = "#ff5a5f";
        throw new Error(errorMessages.join("\n"));
      } else {
        contactName.style.borderColor = "#d3d3d3";
        boolArray[0] = true;
      }
      // catch block catches the error thrown ealier and then I create a new array made from spliting the error message using \n
      // then for each element in error array I check if it isnt empty in which case I create a new div element, put my error inside
      // and apend it to the contactNameError element, before changing opacity.
    } catch (error) {
      const errorArray = error.message.split("\n");
      errorArray.forEach((errorMessage) => {
        if (errorMessage !== "") {
          const div = document.createElement("div");
          div.innerText = errorMessage;
          contactNameError.appendChild(div);
          changeOpacity(contactNameError);
        }
      });
    }
  }

  /*   function containsSpecialChars(string) {
    const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return regex.test(string);
  }
 */
  function validateInput(
    input,
    inputElement,
    contactErrorElement,
    minimunCharacterNumber,
    maximumCharacterNumber
  ) {
    contactErrorElement.innerText = null;
    let errorMessages = [];

    const inputValidationCriteria = {
      Name: {
        disallowedChars: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
        disallowedSpace: /( )/,
      },
      Surname: {
        disallowedChars: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
        disallowedSpace: /( )/,
      },
      Email: {
        requiredChars: /[@]/,
      },
    };

    try {
      if (inputElement.value.length <= minimunCharacterNumber)
        errorMessages.push(
          `${input} has to be longer than ${minimunCharacterNumber}`
        );
      if (inputElement.value.length >= maximumCharacterNumber)
        errorMessages.push(
          `${input} has to be shorter than ${maximumCharacterNumber}`
        );

      if (input == "Name" || input == "Surname") {
        console.log("code is at input name or surname");
        console.log(inputValidationCriteria[input]);
        if (
          inputValidationCriteria[input] &&
          inputValidationCriteria[input].disallowedSpace &&
          inputValidationCriteria[input].disallowedSpace.test(
            inputElement.value
          )
        )
          errorMessages.push(`${input} can't contain any spaces`);
        if (
          inputValidationCriteria[input] &&
          inputValidationCriteria[input].disallowedChars &&
          inputValidationCriteria[input].disallowedChars.test(
            inputElement.value
          )
        )
          errorMessages.push(`${input} can't contain any special characters`);
      }
      if (input == "Email") {
        if (
          inputValidationCriteria[input] &&
          inputValidationCriteria[input].requiredChars &&
          !inputValidationCriteria[input].requiredChars.test(inputElement.value)
        ) {
          errorMessages.push(`${input} must include an @ symbol`);
        }
      }
      if (errorMessages.length > 0) {
        boolArray[0] = false;
        error.message.inputElement.style.borderColor = "#ff5a5f";
        throw new Error(errorMessages.join("\n"));
      } else {
        inputElement.style.borderColor = "#d3d3d3";
        boolArray[0] = true;
      }
    } catch (error) {
      const errorArray = error.message.split("\n");
      errorArray.forEach((errorMessage) => {
        if (errorMessage !== "") {
          const div = document.createElement("div");
          div.innerText = errorMessage;
          contactErrorElement.appendChild(div);
          changeOpacity(contactErrorElement);
        }
      });
    }
  }

  /*  if (
    contactName.value.length <= 2 ||
    contactName.value.length >= 15 ||
    contactName.value.includes(" ") ||
    containsSpecialChars(contactName.value)
  ) {
    boolArray[0] = false;
    contactNameError.innerText =
      "* Name is required, it has to be longer than 2 and shorter than 15 characters, and cannot contain any spaces, or special characters.";
    changeOpacity(contactNameError);
    contactName.style.borderColor = "#ff5a5f";
  } */
  validateInput("Name", contactName, contactNameError, 2, 15);
  validateInput("Surname", contactSurname, contactSurnameError, 2, 15);
  validateInput("Email", contactEmail, contactEmailError, 4, 50);
  validateInput("Message", contactMessage, contactMessageError, 20, 1000);

  /* if (
    contactSurname.value.length <= 2 ||
    contactSurname.value.length >= 15 ||
    contactSurname.value.includes(" ") ||
    containsSpecialChars(contactSurname.value)
  ) {
    boolArray[1] = false;
    contactSurnameError.innerText =
      "* Surname is required, it has to be longer than 2 and shorter than 15 characters, and cannot contain any spaces, or special characters.";
    changeOpacity(contactSurnameError);
    contactSurname.style.borderColor = "#ff5a5f";
  } */
  /* if (
    contactSurname.value.length <= 4 ||
    contactEmail.value.length >= 50 ||
    !contactEmail.value.includes("@")
  ) {
    boolArray[2] = false;
    contactEmailError.innerText =
      "* Email is required, it has to be longer than 4 and shorter than 50 characters, and it has to include @.";
    changeOpacity(contactEmailError);
    contactEmail.style.borderColor = "#ff5a5f";
  }
  if (
    contactMessage.value.length <= 20 ||
    contactMessage.value.length >= 1000
  ) {
    boolArray[3] = false;
    contactMessageError.innerText =
      "* Message is required, it has to be longer than 20 and shorter than 1000 characters.";
    changeOpacity(contactMessageError);
    contactMessage.style.borderColor = "#ff5a5f";
  } */
  if (!boolArray.includes(false)) {
    console.log("Attempting to send...");
    defineParameters();
  } else {
    boolMap = boolArray.reduce((acc, val, i) => {
      acc[i] = val;
      return acc;
    }, {});
    console.log(boolMap);
  }
}

function defineParameters() {
  let contactParameters = {
    from_name: contactName.value + " " + contactSurname.value,
    email_id: contactEmail.value,
    message: contactMessage.value,
    phone_id: contactPhone.value,
  };
  sendEmail(contactParameters);
}

function sendEmail(contactParameters) {
  emailjs.send(serviceID, templateID, contactParameters, publickey).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
}

/*Contact Form*/
/*Window Events*/
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);
window.addEventListener("load", headerTypeWriter);
window.onload = function () {
  init();

  const phoneText = document.querySelector(".phone-text");
  const emailText = document.querySelector(".email-text");

  let emailDecrypted = window.atob(emailText.innerText);
  let phoneDecrypted = window.atob(phoneText.innerText);

  phoneText.innerText = phoneDecrypted;
  emailText.innerText = emailDecrypted;
};
/*End of Window Events */
