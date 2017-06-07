import * as _ from "lodash";
import { Coordinate } from "./geometry";

interface Glyph {
    readonly char: string;
    readonly bgColor?: string;
    readonly fgColor?: string;
}

export class Tile {
    public static readonly nullTile = new Tile({ char: " " });
    public static readonly wallTile = new Tile({ char: "#" });
    public static readonly floorTile = new Tile({ char: "." });

    private static defaultGlyph: Glyph = {
        char: " ",
        fgColor: null,
        bgColor: null
    };

    public readonly glyph: Glyph;

    constructor(glyph: Glyph) {
        this.glyph = { ...Tile.defaultGlyph, ...glyph };
    }
}

export class TileMap {
    private arr: Tile[][];

    constructor(public readonly width: number, public readonly height: number) {
        this.arr = _.times(height, (y) => _.times(width, (x) => {
            if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
                return Tile.wallTile;
            } else {
                return Tile.floorTile;
            }
        }));
    }

    public tileAt(x: number, y: number): Tile {
        return this.arr[y][x];
    }
}
