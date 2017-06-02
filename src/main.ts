import * as ROT from "rot-js";

window.onload = () => {
    if (!ROT.isSupported()) {
        console.error("ROT.js is not supported in your environment.");
    } else {
        const display = new ROT.Display({ width: 80, height: 20 });
        document.body.appendChild(display.getContainer());

        display.draw(2, 10, "@");
    }
};
