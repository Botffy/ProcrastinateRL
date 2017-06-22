import * as _ from "lodash";

import * as ROT from "rot-js";
import { Display } from "./display/display";
import * as Generator from "./map/generators/rot-dungeon";
import { Movement, Point, Rectangle } from "./map/geometry";
import * as Map from "./map/map";

export class Game {
    private display: Display;
    private map: Map.TileMap;
    private fov: ROT.FOV.FOV;
    private centerPoint: Point;
    private heroSees: Set<string>;

    private readonly tiles = {
        wallTile: new Map.Tile({ glyph: { char: "#" }, isPassable: false, isTransparent: false }),
        floorTile: new Map.Tile({ glyph: { char: "." }, isPassable: true, isTransparent: true })
    };

    constructor(display: Display) {
        window.addEventListener("keydown", (e) => {
            this.handleInput(e);
            this.draw();
        });

        this.display = display;

        this.map = Generator.rotDungeonGenerator({ width: 80, height: 80 }, this.tiles);

        let p: Point;
        const q = [Point.at(0, 0)];
        const v = [];

        while (!_.isEmpty(q)) {
            p = q.shift();

            if (_.find(v, (vv) => vv.x === p.x && vv.y === p.y)) {
                continue;
            }

            if (this.map.get(p).isPassable) {
                this.centerPoint = p;
                break;
            }

            if (this.map.get(p) === Map.Tile.nullTile) {
                continue;
            }

            v.push(p);
            q.push(...p.neighbours());
        }

        if (_.isNil(this.centerPoint)) {
            throw new Error("Could not find starting location :/");
        }

        this.fov = new ROT.FOV.PreciseShadowcasting((x: number, y: number) => {
            return this.map.get(Point.at(x, y)).isTransparent;
        });

        this.updateHeroVision();
        this.draw();
    }

    public draw(): void {
        const size = this.display.getSize();
        const viewPortCenter = Point.at(
            this.centerPoint.x - Math.floor(size.width / 2),
            this.centerPoint.y - Math.floor(size.height / 2)
        );
        const viewPort = new Rectangle(viewPortCenter, size);
        const map = this.map.getViewPort(viewPort);
        for (const {tile, point} of map) {
            if (!this.heroSees.has((point.x + viewPort.point.x) + "," + (point.y + viewPort.point.y))) {
                map.set(point, Map.Tile.nullTile);
            }
        }

        this.display.draw(map);
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
            this.updateHeroVision();
        } else {
            console.log("Hero cannot move to (%d,%d)", pos.x, pos.y);
        }
    }

    private updateHeroVision() {
        this.heroSees = new Set<string>();
        this.fov.compute(
            this.centerPoint.x, this.centerPoint.y, 7,
            (x: number, y: number, r: number, visibility: number) => {
                if (visibility > 0) {
                    this.heroSees.add(x + "," + y);
                }
            }
        );
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
