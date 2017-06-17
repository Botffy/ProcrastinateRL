import { Point, Size } from "../geometry";
import { Tile, TileDefinition, TileMap } from "../map";

import * as ROT from "rot-js";

export function rotDungeonGenerator(size: Size, tiles: TileDefinition): TileMap {
    const map = new TileMap(size);
    const generator = new ROT.Map.Digger(size.width, size.height);
    generator.create((x: number, y: number, value: number) => {
        if (value === 0) {
            map.set(Point.at(x, y), tiles.floorTile);
        } else {
            map.set(Point.at(x, y), tiles.wallTile);
        }
    });
    console.log("Map generated");
    return map;
}
