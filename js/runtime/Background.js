//背景类

import { DataStore } from "../base/DataStore";
import { Sprite } from "../base/Sprite";

export class Background extends Sprite {
    constructor() {
        const image = Sprite.getImage('background');
        // console.log(image);
        const canvas = DataStore.getInstance().canvas;
        super(image, 
            0, 0,
            image.width, image.height,
            0, 0,
            canvas.width, canvas.height);
    }
}