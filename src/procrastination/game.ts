import * as ROT from "rot-js";
import * as Map from "./map";

export class Game {
    private display;

    constructor(display: ROT.Display) {
        this.display = display;
        const map = new Map.TileMap(80, 20);

        for (let y = 0; y < 20; ++y) {
            for (let x = 0; x < 80; ++x) {
                display.draw(x, y, map.tileAt(x, y).glyph.char);
            }
        }
    }

    public getDisplay(): ROT.Display {
        return this.display;
    }
}
