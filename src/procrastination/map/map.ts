import * as _ from "lodash";
import { Point, Rectangle, Size } from "./geometry";

export interface Glyph {
    readonly char: string;
    readonly bgColor?: string;
    readonly fgColor?: string;
}

export class Tile {
    public static readonly nullTile = new Tile({
        glyph: { char: " ", bgColor: null, fgColor: null },
        isPassable: false
    });

    public readonly glyph: Glyph;
    public readonly isPassable: boolean;

    constructor(initializer: { glyph: Glyph, isPassable: boolean }) {
        this.glyph = Object.assign({}, initializer.glyph);
        this.isPassable = initializer.isPassable;
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

    public asRectangle(): Rectangle {
        return new Rectangle(Point.origin, this.size);
    }

    public getViewPort(rectangle: Rectangle): TileMap {
        const result = new TileMap(rectangle.size);

        const viewPort = this.asRectangle().intersectWith(rectangle);

        if (viewPort === null) {
            return result;
        }

        for (let y = viewPort.point.y; y < viewPort.point.y + viewPort.size.height; ++y) {
            for (let x = viewPort.point.x; x < viewPort.point.x + viewPort.size.width; ++x) {
                result.set(Point.at(x - rectangle.point.x, y - rectangle.point.y), this.arr[y][x]);
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
