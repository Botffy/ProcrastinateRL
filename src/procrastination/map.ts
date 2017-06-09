import * as _ from "lodash";
import { Point } from "./geometry";

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

export class TileMap implements Iterable<{ tile: Tile, point: Point }> {
    private arr: Tile[][];

    constructor(public readonly width: number, public readonly height: number) {
        this.arr = _.times(height, (y) => _.times(width, (x) => Tile.nullTile));
    }

    public get(point: Point): Tile {
        return this.arr[point.y][point.x];
    }

    public set(point: Point, tile: Tile): void {
       this.arr[point.y][point.x] = tile;
    }

    public [Symbol.iterator]() {
        let x, y: number = -1;
        const arr = this.arr;

        return {
            next(): IteratorResult<{ tile: Tile, point: Point }> {
                ++x;
                if (y === -1 || x >= arr[y].length) {
                    x = 0;
                    ++y;
                }

                if (y >= arr.length) {
                    return {
                        done: true,
                        value: null
                    };
                }

                return {
                    done: false,
                    value: {
                        tile: arr[y][x],
                        point: Point.at(x, y)
                    }
                };
            }
        };
    }
}
