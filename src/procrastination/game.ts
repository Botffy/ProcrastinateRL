import * as ROT from "rot-js";
import { Point } from "./geometry";
import * as Map from "./map";

export class Game {
    private display;

    constructor(display: ROT.Display) {
        this.display = display;
        const map = new Map.TileMap({ width: 200, height: 200 });
        for (let y = 0; y < map.size.height; ++y) {
            for (let x = 0; x < map.size.width; ++x) {
                if (x === 0 || y === 0 || y === map.size.height - 1 || x === map.size.width - 1) {
                    map.set(Point.at(x, y), Map.Tile.wallTile);
                } else {
                    map.set(Point.at(x, y), Map.Tile.floorTile);
                }
            }
        }

        const focusPoint = Point.at(1, 1);
        const {width, height} = display.getOptions();
        const viewPortCenter = Point.at(focusPoint.x - width / 2, focusPoint.y - height / 2);

        for (const {tile, point} of map.getViewPort({ point: viewPortCenter, size: { width, height }})) {
            display.draw(point.x, point.y, tile.glyph.char);
        }
    }

    public getDisplay(): ROT.Display {
        return this.display;
    }
}
