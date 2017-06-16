import * as ROT from "rot-js";
import { Movement, Point, Rectangle } from "./geometry";
import * as Map from "./map";

export class Game {
    private readonly wallTile = new Map.Tile({ glyph: { char: "#" }, isPassable: false });
    private readonly floorTile = new Map.Tile({ glyph: { char: "." }, isPassable: true });

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
                    this.map.set(Point.at(x, y), this.wallTile);
                } else {
                    this.map.set(Point.at(x, y), this.floorTile);
                }
            }
        }
        this.centerPoint = Point.at(1, 1);
        this.draw();
    }

    public draw(): void {
        const {width, height} = this.display.getOptions();
        const viewPortCenter = Point.at(
            this.centerPoint.x - Math.floor(width / 2),
            this.centerPoint.y - Math.floor(height / 2)
        );
        const viewPort = new Rectangle(viewPortCenter, {width, height});

        for (const {tile, point} of this.map.getViewPort(viewPort)) {
            this.display.draw(point.x, point.y, tile.glyph.char, tile.glyph.fgColor, tile.glyph.bgColor);
        }

        this.display.draw(this.centerPoint.x - viewPort.point.x, this.centerPoint.y - viewPort.point.y, "@");
    }

    public getDisplay(): ROT.Display {
        return this.display;
    }

    private moveHero(movement: Movement): void {
        const pos = this.centerPoint.add(movement);
        if (this.map.get(pos).isPassable) {
            this.centerPoint = pos;
        }
    }

    public handleInput(inputData: KeyboardEvent): void {
        switch (inputData.keyCode) {
            case ROT.VK_DOWN:
                this.moveHero({ x: 0, y: 1 });
                break;
            case ROT.VK_UP:
                this.moveHero({ x: 0, y: -1 });
                break;
            case ROT.VK_LEFT:
                this.moveHero({ x: -1, y: 0 });
                break;
            case ROT.VK_RIGHT:
                this.moveHero({ x: 1, y: 0 });
                break;
            default:
                break;
        }
    }
}
