import { Size } from "./geometry";
import { TileMap } from "./map";

export type Generator = (size: Size) => TileMap;
