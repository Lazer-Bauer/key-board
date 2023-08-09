const keyboard = Array.from(document.querySelectorAll(".key"));
let pad = document.querySelector(".writingPad");
const clearPad = document.querySelector(".clear");
const light = document.querySelector(".green");
console.log(light);
console.log(clearPad);
console.log(pad);
console.log(keyboard);

document.addEventListener("click", (e) => {
  if (e.target && (e.target as HTMLElement).matches(".clear")) {
    if (pad) pad.textContent = ""; //need to check it works
  }
});
let readKeyLetter = "";
let capsWasClicked = false; // state

for (const key of keyboard) {
  key.addEventListener("click", () => {
    // handle key clicked
    if (key.textContent) readKeyLetter = key.textContent;

    if (key.matches(`.backspace`)) {
      HandleBackSpaceButton();
      return;
    }
    if (readKeyLetter === "←") {
      HandleBackSpaceButton();
      return;
    }

    if (readKeyLetter === "space") {
      HandleSpaceButton();
      return undefined;
    }

    if ((key as HTMLElement).dataset.special === "line down") {
      HandleLineDown();
      return;
    }

    if (key.matches(".capsLock")) {
      HandleCapsLock();
      return;
    }

    pushKeyboard(readKeyLetter);

    console.log(readKeyLetter);
  });
}
function HandleBackSpaceButton() {
  if (pad) {
    const text = pad?.textContent;
    const arrayInCharacters = text.split("");
    console.log(arrayInCharacters);
    arrayInCharacters?.splice(-1, 1);
    const modified = arrayInCharacters.join("");
    console.log(modified);
    pad.textContent = modified;
  }
}
function HandleSpaceButton() {
  pad.innerHTML += ` `;
}
function HandleLineDown() {
  pad.innerHTML += `<br>`;
}
function HandleCapsLock() {
  capsWasClicked = !capsWasClicked;
  console.log("i was called even once");
  if (capsWasClicked) {
    light.classList.add("active");
  } else {
    light.classList.remove("active");
  }
}

function pushKeyboard(key: string) {
  pad.innerHTML += capsWasClicked ? key.toUpperCase() : key;
}
