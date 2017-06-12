import * as ROT from "rot-js";
import { Point, Rectangle } from "./geometry";
import * as Map from "./map";

export class Game {
    private display;
    private map: Map.TileMap;
    private centerPoint: Point;

    constructor(display: ROT.Display) {
        window.addEventListener("keydown", (e) => {
            this.handleInput(e);
            this.draw();
        });

        this.display = display;
        this.map = new Map.TileMap({ width: 200, height: 200 });
        for (let y = 0; y < this.map.size.height; ++y) {
            for (let x = 0; x < this.map.size.width; ++x) {
                if (x === 0 || y === 0 || y === this.map.size.height - 1 || x === this.map.size.width - 1) {
                    this.map.set(Point.at(x, y), Map.Tile.wallTile);
                } else {
                    this.map.set(Point.at(x, y), Map.Tile.floorTile);
                }
            }
        }
        this.centerPoint = Point.at(1, 1);
        this.draw();
    }

    private draw(): void {
        const {width, height} = this.display.getOptions();
        const viewPortCenter = Point.at(this.centerPoint.x - width / 2, this.centerPoint.y - height / 2);
        const viewPort = new Rectangle(viewPortCenter, {width, height});

        for (const {tile, point} of this.map.getViewPort(viewPort)) {
            this.display.draw(point.x, point.y, tile.glyph.char);
        }

        this.display.draw(this.centerPoint.x - viewPort.point.x, this.centerPoint.y - viewPort.point.y, "@");
    }

    public getDisplay(): ROT.Display {
        return this.display;
    }

    public handleInput(inputData: KeyboardEvent): void {
        switch (inputData.keyCode) {
            case ROT.VK_DOWN:
                this.centerPoint.y += 1;
                break;
            case ROT.VK_UP:
                this.centerPoint.y -= 1;
                break;
            case ROT.VK_LEFT:
                this.centerPoint.x -= 1;
                break;
            case ROT.VK_RIGHT:
                this.centerPoint.x += 1;
                break;
            default:
                break;
        }
    }
}
