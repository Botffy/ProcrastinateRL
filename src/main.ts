import * as ROT from "rot-js";
import { Game } from "./procrastination/game";

window.onload = () => {
    if (!ROT.isSupported()) {
        console.error("ROT.js is not supported in your environment.");
    } else {
        const display = new ROT.Display({ width: 80, height: 20 });
        document.body.appendChild(display.getContainer());
        const game = new Game(display);
    }
};
