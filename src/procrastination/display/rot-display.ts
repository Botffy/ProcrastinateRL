import * as _ from "lodash";
import * as ROT from "rot-js";

import { Display } from "./display";

import { Point, Rectangle, Size } from "../map/geometry";
import { Glyph, TileMap } from "../map/map";

function isSameGlyph(g1: Glyph, g2: Glyph): boolean {
    return g1.char === g2.char
        && ( (_.isNil(g1.fgColor) && _.isNil(g2.fgColor)) || g1.fgColor === g2.fgColor )
        && ( (_.isNil(g1.bgColor) && _.isNil(g2.bgColor)) || g1.bgColor === g2.bgColor );
}

export class ROTDisplay implements Display {
    private static readonly nullGlyph: Glyph = { char: " " };

    private display: ROT.Display;
    private size: Size;
    private screenBuffer: Glyph[][];
    private drawBuffer: Glyph[][];

    public constructor(display: ROT.Display) {
        this.display = display;
        this.initialize();
    }

    private initialize(): void {
        this.size = this.getSize();

        this.screenBuffer = _.times(this.size.height, () => _.times(this.size.width, () => ROTDisplay.nullGlyph ));
        this.drawBuffer = _.times(this.size.height, () => _.times(this.size.width, () => ROTDisplay.nullGlyph ));
        this.display.clear();

        console.log("Initialized buffer %d x %d", this.size.width, this.size.height);
    }

    public draw(map: TileMap): void;
    public draw(point: Point, glyph: Glyph);
    public draw(a1: TileMap | Point, a2?: Glyph) {
        if (!_.isEqual(this.size, this.getSize())) {
            this.initialize();
        }

        if (a1 instanceof TileMap) {
            this.drawMap(a1);
        } else {
            this.drawPoint(a1, a2);
        }
    }

    private drawMap(viewPort: TileMap): void {
        for (const {tile, point} of viewPort) {
            this.drawBuffer[point.y][point.x] = tile.glyph;
        }
    }

    private drawPoint(point: Point, glyph: Glyph): void {
        this.drawBuffer[point.y][point.x] = glyph;
    }

    public flip(): void {
        const t0 = performance.now();

        let glyph = ROTDisplay.nullGlyph;
        for (let x = 0; x < this.size.width; ++x) {
            for (let y = 0; y < this.size.height; ++y) {
                if (isSameGlyph(this.drawBuffer[y][x], this.screenBuffer[y][x])) {
                    continue;
                }

                glyph = this.drawBuffer[y][x];
                this.screenBuffer[y][x] = glyph;

                this.display.draw(x, y, glyph.char, glyph.fgColor, glyph.bgColor);
            }
        }

        const t1 = performance.now();
        console.debug("Rendered canvas (%d ms)", t1 - t0);
    }

    public getSize(): Size {
        const {width, height} = this.display.getOptions();
        return { width, height };
    }
}
