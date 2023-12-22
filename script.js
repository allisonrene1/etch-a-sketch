"use strict";
const body = document.body;
const container = document.getElementById("gridContainer");

const pageContainer = document.createElement("div");
pageContainer.classList.add("page-container");

const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-container");

const eraserButton = document.createElement("button");
eraserButton.textContent = "ERASER";
eraserButton.classList.add("eraser-button");

const clearButton = document.createElement("button");
clearButton.textContent = "CLEAR ETCH-A-SKETCH";
clearButton.classList.add("clear-button");

const colorButton = document.createElement("button");
colorButton.textContent = "COLOR MODE";
colorButton.classList.add("color-button");

buttonContainer.appendChild(colorButton);
buttonContainer.appendChild(eraserButton);
buttonContainer.appendChild(clearButton);

pageContainer.appendChild(buttonContainer);
pageContainer.appendChild(container);

body.appendChild(pageContainer);

let colorChangeEvent = false;
let eraserMode = false;

// Creating a 16x16 grid container by manipulating the DOM and mouse events for drawing

for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    container.appendChild(gridItem);

    gridItem.addEventListener("click", () => {
      if (!colorChangeEvent) {
        gridItem.style.backgroundColor = getRandomColor();
      }
    });
    gridItem.addEventListener("mousedown", () => {
      colorChangeEvent = true;
      gridItem.style.backgroundColor = getRandomColor();
      console.log("Mouse down");
    });

    gridItem.addEventListener("mousemove", () => {
      if (colorChangeEvent) {
        gridItem.style.backgroundColor = getRandomColor();
      }
    });

    gridItem.addEventListener("mouseup", () => {
      colorChangeEvent = false;
    });
  }
}

// A function to generate a random color for each div background

function getRandomColor() {
  if (!eraserMode) {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  } else {
    return "white";
  }
}

// Function to erase each div that is clicked on

function activateEraser() {
  eraserMode = true;
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((gridItem) => {
    gridItem.addEventListener("click", eraseColor);
  });
}
function eraseColor(event) {
  event.target.style.backgroundColor = "white";
}
eraserButton.addEventListener("click", activateEraser);

// Function to reset entire grid to it's original state

function resetGrid() {
  eraserMode = true;
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((gridItem) => {
    gridItem.style.backgroundColor = "";
  });
}
clearButton.addEventListener("click", resetGrid);

// Function to start coloring with the etch-a-sketch

function activateColor() {
  eraserMode = false;
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((gridItem) => {
    gridItem.removeEventListener("click", eraseColor);
    gridItem.addEventListener("click", getRandomColor);
  });
}
colorButton.addEventListener("click", activateColor);
