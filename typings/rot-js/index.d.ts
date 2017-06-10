
declare module "rot-js" {
    module ROT {
        function isSupported(): boolean;

        class Display {
            public constructor(options: DisplayOptions);
            public getContainer(): Node;
            public draw(x: number, y: number, character: any, fgColor?: string, bgColor?: string): void;
            public drawText(x: number, y: number, text: string, width?: number): void;
            public getOptions(): DisplayOptions
        }

        interface DisplayOptions {
            width: number;
            height: number;
        }

        var VK_LEFT: number;
        var VK_UP: number;
        var VK_RIGHT: number;
        var VK_DOWN: number;
    }

    export = ROT;
}

