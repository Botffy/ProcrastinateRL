import { Point, Rectangle, Size } from "../map/geometry";
import { Glyph, TileMap } from "../map/map";

export interface Display {
    draw(viewPort: TileMap): void;
    draw(point: Point, glyph: Glyph): void;
    flip(): void;

    getSize(): Size;
}
