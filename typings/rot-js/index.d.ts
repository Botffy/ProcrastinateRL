
declare module "rot-js" {
    module ROT {
        function isSupported(): boolean;

        class Display {
            public constructor(options: IDisplayOptions);
            public getContainer(): Node;
            public draw(x: number, y: number, character: any, fgColor?: string, bgColor?: string): void;
            public drawText(x: number, y: number, text: string, width?: number): void;
        }

        interface IDisplayOptions {
            width: number;
            height: number;
        }
    }

    export = ROT;
}

