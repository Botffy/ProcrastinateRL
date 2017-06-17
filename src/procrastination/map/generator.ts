import { Size } from "./geometry";
import { Tile, TileDefinition, TileMap } from "./map";

import { rotDungeonGenerator } from "./generators/rot-dungeon";

export type Generator = (size: Size, tiles: TileDefinition) => TileMap;

export function getGenerator(str: "ROTDungeon"): Generator {
    switch (str) {
        case "ROTDungeon":
            return rotDungeonGenerator;
    }
}
