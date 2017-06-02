import * as ROT from "rot-js";

export class Game {
    private display;

    constructor(display: ROT.Display) {
        this.display = display;
        display.draw(2, 10, "@");
    }

    public getDisplay(): ROT.Display {
        return this.display;
    }
}
