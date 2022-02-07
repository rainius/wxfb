//不断移动的地面

import { DataStore } from "../base/DataStore";
import { Sprite } from "../base/Sprite";
import { Director } from "../Director";
import { canvas } from "../libs/weapp-adapter";

export class Land extends Sprite {
    constructor() {
        
        const canvasWidth = DataStore.getInstance().canvas.width;
        const canvasHeight = DataStore.getInstance().canvas.height;
        const image = Sprite.getImage('land');
        super(image, 
            0, 0, image.width, image.height,
            0, canvasHeight - image.height,
            canvasWidth, image.height);

        this.left = canvasWidth;
        this.landSpeed = -Director.getInstance().moveSpeed;

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    // 重写draw()以实现地面不停左移
    draw() {
        this.left += this.landSpeed;
        if (this.left <= 0) {
            this.left = this.canvasWidth;
        }

        super.draw(this.img, 
            this.srcX, this.srcY, this.srcW, this.srcH,
            -this.canvasWidth + this.left, this.y, this.width, this.height);

        super.draw(this.img, 
            this.srcX, this.srcY, this.srcW, this.srcH,
            this.left, this.y, this.width, this.height);
    }
}