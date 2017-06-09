import * as ROT from "rot-js";
import { Point } from "./geometry";
import * as Map from "./map";

export class Game {
    private display;

    constructor(display: ROT.Display) {
        this.display = display;
        const map = new Map.TileMap(80, 20);

        for (const {tile, point} of map) {
            display.draw(point.x, point.y, tile.glyph.char);
        }
    }

    public getDisplay(): ROT.Display {
        return this.display;
    }
}
