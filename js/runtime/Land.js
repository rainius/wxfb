//不断移动的地面
import { DataStore } from "../base/DataStore";
import { Sprite } from "../base/Sprite";

export class Land extends Sprite {
    constructor() {
        const image = Sprite.getImage('land');
        super(this.image, 
            0, 0, image.width, image.height,
            0, DataStore.getInstance().canvas.height - image.height,
            image.width, image.height);
    }
}