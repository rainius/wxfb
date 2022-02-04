//小鸟类

import { Sprite } from "../base/Sprite";

export class Bird extends Sprite {
    constructor() {
        const image = Sprite.getImage('bird');
        super(image, 
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height);
    }
}