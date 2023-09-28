const typingDiv = document.getElementById("typing")

console.log(typingDiv);

const text = `A well-organized paragraph`

const characters = text.split("").map((char) => {
    const span = document.createElement("span")
    span.innerText = char
    typingDiv.appendChild(span)
    return span
});

let cursorIndex = 0;
let startTime = null;
let endDate = null;
let cursorCharacter = characters[0];
cursorCharacter.classList.add("cursor");

const keyListener = document.addEventListener("keydown", ({ key }) =>{
    if(!startTime) {
    startTime = new Date();
    }
    if(key === cursorCharacter.innerText) {
        // we typed the correct key
        cursorCharacter.classList.remove("cursor");
        cursorCharacter.classList.add("done");
        // characters[cursorIndex + 1].classList.add("cursor");
        cursorCharacter = characters[++cursorIndex];
    }
    if (cursorIndex >= characters.length) {
        endTime = new Date();
        const delta = endTime - startTime;
        const seconds = delta / 1000;
        const numberOfWords = text.split(" ").length;
        const wps = numberOfWords / seconds;
        const wpm = wps * 60;
        document.getElementById('stats').innerText = `wpm = $(wpm)`
        // display the wpm, cpm
        document.removeEventListener("keydown",keyListener);

        return;
    }
        cursorCharacter.classList.add("cursor");
    
});