export class Point {
    public static at(x: number, y: number): Point;
    public static at(xy: {x: number, y: number} | [number, number]): Point;
    public static at(xy: any, yy?: number): Point {
        let x, y: number;

        if (typeof xy === "number") {
            x = xy;
            y = yy;
        } else if (xy instanceof Array) {
            [x, y] = xy;
        } else {
            ({x, y} = xy);
        }

        return new Point(x, y);
    }

    constructor(public readonly x: number, public readonly y: number) {}
}
