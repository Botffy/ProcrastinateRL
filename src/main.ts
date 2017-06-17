import * as ROT from "rot-js";
import { Game } from "./procrastination/game";

function resizeDisplay(display: ROT.Display) {
    const minWidth = 40;
    const minHeight = 20;

    const w = document.documentElement.clientWidth;
    const h = document.documentElement.clientHeight;

    let [width, height] = display.computeSize(w, h);
    width -= 1;
    height -= 1;
    width = width < minWidth ? minWidth : width;
    height = height < minHeight ? minHeight : height;

    console.log("Resizing display to (%d, %d)", width, height);
    display.setOptions({ width, height });
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
