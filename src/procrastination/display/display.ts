import { Point, Rectangle, Size } from "../geometry";
import { Glyph, TileMap } from "../map";

export interface Display {
    draw(viewPort: TileMap): void;
    draw(point: Point, glyph: Glyph): void;
    flip(): void;

    getSize(): Size;
}
