
declare module "rot-js" {
    namespace ROT {
        function isSupported(): boolean;

        class Display {
            public constructor(options: DisplayOptions);
            public getContainer(): Node;
            public clear(): void;
            public draw(x: number, y: number, character: any, fgColor?: string, bgColor?: string): void;
            public drawText(x: number, y: number, text: string, width?: number): void;
            public getOptions(): DisplayOptions;
            public setOptions(options: DisplayOptions): void;
            public computeSize(availPixelWidth: number, availPixelHeight: number): [number, number];
        }

        namespace Map {
            class Digger {
                public constructor(width: number, height: number);
                public create(callback: (x: number, y: number, value: number) => void): void;
            }
        }

        namespace FOV {
            interface FOV {
                compute(
                    x: number, y: number, R: number,
                    callback: (x: number, y: number, r: number, visibility: number) => void
                ): void;
            }

            class PreciseShadowcasting implements FOV {
                public constructor(lightPasses: (x: number, y: number) => boolean);
                public compute(
                    x: number, y: number, R: number,
                    callback: (x: number, y: number, r: number, visibility: number) => void
                ): void;
            }
        }

        interface DisplayOptions {
            width?: number;
            height?: number;
            fontSize?: number;
            fontFamily?: string;
            fontStyle?: string;
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
