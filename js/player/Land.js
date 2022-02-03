//不断移动的地面

import { DataStore } from "../base/DataStore";
import { Sprite } from "../base/Sprite";
import { Director } from "../Director";

export class Land extends Sprite {
    constructor() {
        const image = Sprite.getImage('land');
        super(image, 
            0, 0, image.width, image.height,
            0, DataStore.getInstance().canvas.height - image.height,
            image.width, image.height);

            this.landX = 0;
            this.landSpeed = Director.getInstance().moveSpeed;
    }

    // 重写draw()以实现地面不停左移
    draw() {
        this.landX = this.landX + this.landSpeed;
        super.draw(this.img, 
            this.srcX, this.srcY, this.srcW, this.srcH,
            -this.landX, this.y, this.width, this.height);
    }
}