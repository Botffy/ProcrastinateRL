import * as ROT from "rot-js";
import { Game } from "./procrastination/game";

function resizeDisplay(display: ROT.Display) {
    const w = document.documentElement.clientWidth;
    const h = document.documentElement.clientHeight;

    const [width, height] = display.computeSize(w, h);
    console.log(width, height);

    display.setOptions({ width: width - 1, height: height - 1 });
}

window.onload = () => {
    if (!ROT.isSupported()) {
        console.error("ROT.js is not supported in your environment.");
    } else {
        const display = new ROT.Display({});
        resizeDisplay(display);

        document.body.appendChild(display.getContainer());
        const game = new Game(display);

        window.onresize = () => {
            resizeDisplay(display);
            game.draw();
        };
    }
};
