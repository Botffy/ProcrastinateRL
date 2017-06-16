
declare module "rot-js" {
    namespace ROT {
        function isSupported(): boolean;

        class Display {
            public constructor(options: DisplayOptions);
            public getContainer(): Node;
            public draw(x: number, y: number, character: any, fgColor?: string, bgColor?: string): void;
            public drawText(x: number, y: number, text: string, width?: number): void;
            public getOptions(): DisplayOptions;
            public setOptions(options: DisplayOptions): void;
            public computeSize(availPixelWidth: number, availPixelHeight: number): [number, number];
        }

        interface DisplayOptions {
            width?: number;
            height?: number;
            fg?: string;
            bg?: string;
        }

        const VK_LEFT: number;
        const VK_UP: number;
        const VK_RIGHT: number;
        const VK_DOWN: number;
    }

    export = ROT;
}
