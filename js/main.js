"use strict";

let minutes = 3;
let seconds = 0;
let intervalIdTimer, intervalId;

let finished = false;

let previousParry = null;
let currentParry = null;

const parries = [
    { name: "Prime", value: 1, pronation: true },
    { name: "Seconde", value: 2, pronation: true },
    { name: "Tierce", value: 3, pronation: true },
    { name: "Quarte", value: 4, pronation: false },
    { name: "Quinte", value: 5, pronation: true },
    { name: "Sixte", value: 6, pronation: false },
    { name: "Septime", value: 7, pronation: false },
    { name: "Octave", value: 8, pronation: false },
    { name: "Neuvieme", value: 9, pronation: false },
];

// Helper functions.
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomParry = () => {
    // Get a random parry.
    let currentParry = parries[random(0, parries.length - 1)];

    // Prevent the same parry from being displayed twice in a row.
    while (currentParry === previousParry) {
        currentParry = parries[random(0, parries.length - 1)];
    }

    // Update the previous parry.
    previousParry = currentParry;

    return currentParry;
};
const parryToHTML = (parry) => {
    document.getElementById("parry-name").textContent = parry.name;
    document.getElementById("parry-hand-position").textContent = parry.pronation
        ? "(Pronation)"
        : "(Supination)";
    document.getElementById("parry-number").textContent = parry.value;
    document.getElementById(
        "parry-image"
    ).src = `./assets/images/parries/${parry.value}-${parry.name}.png`;
    document.getElementById("parry-image").alt = `${parry.value} ${parry.name}`;

    document.getElementById("parry-image").classList.add("parry-image");
};

const startPractice = () => {
    intervalIdTimer = setInterval(() => {
        // Update the timer.
        if (seconds === 0) {
            if (minutes === 0) {
                finished = true;
                stopPractice();
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        // Display the timer.
        document.getElementById("parry-timer").innerHTML = `${minutes}:${
            seconds < 10 ? "0" : ""
        }${seconds}`;
    }, 1000);

    new Audio("./assets/audio/Practice Started.mp3").play();

    intervalId = setInterval(() => {
        // Get a random parry.
        let parry = getRandomParry();

        // Update the UI, play the audio.
        parryToHTML(parry);
        new Audio(
            `./assets/audio/parries/${parry.value}-${parry.name}.mp3`
        ).play();
    }, 2000);

    // Hide the start button and show the stop button.
    document.getElementById("parry-start").style.display = "none";
    document.getElementById("parry-stop").style.display = "block";
};

const stopPractice = () => {
    if (finished) new Audio("./assets/audio/Practice Complete.mp3").play();
    else new Audio("./assets/audio/Practice Stopped.mp3").play();

    // Stop the timers.
    clearInterval(intervalIdTimer);
    clearInterval(intervalId);

    // Reset the timers.
    minutes = 3;
    seconds = 0;

    // Reset the finished flag.
    finished = false;

    // Reset the UI.
    document.getElementById("parry-timer").innerHTML = "3:00";

    document.getElementById("parry-image").src = "./assets/images/fencers3.jpg";
    document.getElementById("parry-image").alt = "Definitely not me!";
    document.getElementById("parry-image").classList.remove("parry-image");

    document.getElementById("parry-name").innerHTML = "";
    document.getElementById("parry-hand-position").innerHTML = "";
    document.getElementById("parry-number").innerHTML = "";

    document.getElementById("parry-start").style.display = "block";
    document.getElementById("parry-stop").style.display = "none";
};

// Event listeners for all the buttons.
// We need to check if the element 'parry-practice' exists,
// because the buttons are only present on the home page.
// This way we can run the fade in animation on all pages.
if (document.getElementById("parry-practice")) {
    document.getElementById("goto-parries").addEventListener("click", () => {
        // Scroll to the list containing all the parries.
        document.getElementById("parries").scrollIntoView();
    });
    document
        .getElementById("parry-start")
        .addEventListener("click", startPractice);
    document
        .getElementById("parry-stop")
        .addEventListener("click", stopPractice);
    document.getElementById("get-started").addEventListener("click", () => {
        // Scroll to the Practice section.
        document.getElementById("parry-practice").scrollIntoView();

        // Play the audio, to indicate that the user can start practicing.
        new Audio(
            "./assets/audio/Click on 'Start Practice' To Begin Practicing.mp3"
        ).play();
    });
}

// Fade in animation when the page is loaded.
window.onload = () => {
    $(".preloader").delay(200).fadeOut("slow");
};
