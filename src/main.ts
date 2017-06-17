import * as ROT from "rot-js";
import * as WebFont from "webfontloader";
import { ROTDisplay } from "./procrastination/display/rot-display";
import { Game } from "./procrastination/game";

WebFont.load({
    google: {
        families: ["Caveat Brush"]
    }
});

console.log("Loaded font");

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
        const canvas = new ROT.Display({
            fontFamily: "'Caveat Brush', cursive"
        });
        resizeDisplay(canvas);

        document.body.appendChild(canvas.getContainer());
        const display = new ROTDisplay(canvas);
        const game = new Game(display);

        window.onresize = () => {
            resizeDisplay(canvas);
            game.draw();
        };
    }
};
