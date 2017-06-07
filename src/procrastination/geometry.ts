export class Coordinate {
    public static at(xy: {x: number, y: number} | [number, number]): Coordinate {
        let x, y: number;
        if (Array.isArray(xy)) {
            [x, y] = xy;
        } else {
            ({x, y} = xy);
        }

        return new Coordinate(x, y);
    }

    constructor(public readonly x: number, public readonly y: number) {}
}
