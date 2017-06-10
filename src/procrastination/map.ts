import * as _ from "lodash";
import { Point, Rectangle, Size } from "./geometry";

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

    constructor(public readonly size: Size) {
        this.arr = _.times(this.size.height, (y) => _.times(this.size.width, (x) => Tile.nullTile));
    }

    public get(point: Point): Tile {
        return this.arr[point.y][point.x];
    }

    public set(point: Point, tile: Tile): void {
        this.arr[point.y][point.x] = tile;
    }

    public getViewPort(rectangle: Rectangle): TileMap {
        const result = new TileMap(rectangle.size);

        const minY = Math.max(rectangle.point.y, 0);
        const minX = Math.max(rectangle.point.x, 0);

        const maxY = Math.min(this.size.height, rectangle.point.y + rectangle.size.height);
        const maxX = Math.min(this.size.width, rectangle.point.x + rectangle.size.width);

        for (let y = minY; y < maxY; ++y) {
            for (let x = minX; x < maxX; ++x) {
                result.set(Point.at(x - rectangle.point.x, y - rectangle.point.y), this.arr[x][y]);
            }
        }

        return result;
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
