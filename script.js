const typingDiv = document.getElementById("typing");
const statsDiv = document.getElementById("stats");
const startGameBtn = document.getElementById("start-game");
const paragraphs = [
    `A well-organized paragraph`,
    `The band invents a new way to practice via four-way iChat. To the dismay of his bandmates, Fish performs in the nude due to the heat of his new residence. The video of the practice quickly goes viral under the title of the "naked drummer band". The band is signed to a recording contract by the same label as Vesuvius, and are sent on a midwest tour. However, Fish commits stereotypical acts, despite the physical costs on his body, and he vandalizes a hotel room, causing the band to be apprehended again`
];

const startGame = () => {
    startGameBtn.classList.add('hidden');
    typingDiv.innerHTML = "";
    statsDiv.innerHTML = "";

    const text = paragraphs[Math.floor(Math.random() * paragraphs.length)];

    const characters = text.split("").map((char) => {
        const span = document.createElement("span");
        span.innerText = char;
        typingDiv.appendChild(span);
        return span;
    });

    let cursorIndex = 0;
    let startTime = null;
    let endTime = null;
    let cursorCharacter = characters[cursorIndex];
    cursorCharacter.classList.add("cursor");

    const keydown = ({ key }) => {
        if (!startTime) {
            startTime = new Date();
        }
        if (key === cursorCharacter.innerText) {
            // we typed the correct key
            cursorCharacter.classList.remove("cursor");
            cursorCharacter.classList.add("done");
            cursorCharacter = characters[++cursorIndex];
        }

        if (cursorIndex >= characters.length) {
            // game ended
            endTime = new Date();
            const delta = endTime - startTime;
            const seconds = delta / 1000;
            const numberOfWords = text.split(" ").length;
            const wps = numberOfWords / seconds;
            const wpm = wps * 60;
            document.getElementById('stats').innerText = `wpm = ${wpm}`;

            // display the wpm, cpm
            document.removeEventListener("keydown", keydown);
            startGameBtn.classList.remove('hidden');
            return;
        }
        cursorCharacter.classList.add("cursor");
    };

    document.addEventListener("keydown", keydown);
};

// Add an event listener to the "Start Game" button
startGameBtn.addEventListener("click", startGame);