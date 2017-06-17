import * as ROT from "rot-js";
import { Display } from "./display/display";
import * as Generator from "./map/generators/rot-dungeon";
import { Movement, Point, Rectangle } from "./map/geometry";
import * as Map from "./map/map";

export class Game {
    private display: Display;
    private map: Map.TileMap;
    private centerPoint: Point;

    private readonly tiles = {
        wallTile: new Map.Tile({ glyph: { char: "#" }, isPassable: false }),
        floorTile: new Map.Tile({ glyph: { char: "." }, isPassable: true })
    };

    constructor(display: Display) {
        window.addEventListener("keydown", (e) => {
            this.handleInput(e);
            this.draw();
        });

        this.display = display;

        this.map = Generator.rotDungeonGenerator({ width: 80, height: 80 }, this.tiles);
        this.centerPoint = Point.at(1, 1);
        this.draw();
    }

    public draw(): void {
        const size = this.display.getSize();
        const viewPortCenter = Point.at(
            this.centerPoint.x - Math.floor(size.width / 2),
            this.centerPoint.y - Math.floor(size.height / 2)
        );
        const viewPort = new Rectangle(viewPortCenter, size);

        this.display.draw(this.map.getViewPort(viewPort));
        this.display.draw(
            Point.at({x: this.centerPoint.x - viewPort.point.x, y: this.centerPoint.y - viewPort.point.y}),
            { char: "@" }
        );

        this.display.flip();
    }

    private moveHero(movement: Movement): void {
        const pos = this.centerPoint.add(movement);
        if (this.map.get(pos).isPassable) {
            console.log("Hero moves to (%d,%d)", pos.x, pos.y);
            this.centerPoint = pos;
        } else {
            console.log("Hero cannot move to (%d,%d)", pos.x, pos.y);
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
