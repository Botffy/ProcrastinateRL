import { Size } from "./geometry";
import { Tile, TileMap } from "./map";

export interface TileDefinition {
    readonly wallTile: Tile;
    readonly floorTile: Tile;
}

export type Generator = (size: Size, tiles: TileDefinition) => TileMap;
