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

    public static readonly origin = Point.at(0, 0);

    constructor(public readonly x: number, public readonly y: number) {}

    public clone(): Point {
        return new Point(this.x, this.y);
    }

    public add(movement: Movement): Point {
        return Point.at(this.x + movement.x, this.y + movement.y);
    }
}

export interface Movement {
    readonly x: number;
    readonly y: number;
}

export interface Size {
    readonly width: number;
    readonly height: number;
}

export class Rectangle {
    constructor(public readonly point: Point, public readonly size: Size) {}

    /**
     *  The four corner points of the rectangle, given in counterclockwise order.
     */
    public corners(): [Point, Point, Point, Point] {
        return [
            this.point,
            Point.at(this.point.x + this.size.width, this.point.y),
            Point.at(this.point.x + this.size.width, this.point.y + this.size.height),
            Point.at(this.point.x, this.point.y + this.size.height),
        ];
    }

    public intersectionWith(that: Rectangle): Rectangle {
        const [p11, , p12, ] = this.corners();
        const [p21, , p22, ] = that.corners();

        const minY = Math.max(p11.y, p21.y);
        const minX = Math.max(p11.x, p21.x);

        const maxY = Math.min(p12.y, p22.y);
        const maxX = Math.min(p12.x, p22.x);

        if (maxX - minX <= 0 || maxY - minY <= 0) {
            return null;
        }

        return new Rectangle(Point.at(minX, minY), { width: maxX - minX, height: maxY - minY });
    }
}
