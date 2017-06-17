import { Generator } from "../generator";
import { Point, Size } from "../geometry";
import { Tile, TileMap } from "../map";

import * as ROT from "rot-js";

const wallTile = new Tile({ glyph: { char: "#" }, isPassable: false });
const floorTile = new Tile({ glyph: { char: "." }, isPassable: true });

export function rotDungeonGenerator(size: Size): TileMap {
    const map = new TileMap(size);
    const generator = new ROT.Map.Digger(size.width, size.height);
    generator.create((x: number, y: number, value: number) => {
        if (value === 0) {
            map.set(Point.at(x, y), floorTile);
        } else {
            map.set(Point.at(x, y), wallTile);
        }
    });
    console.log("Map generated");
    return map;
}
