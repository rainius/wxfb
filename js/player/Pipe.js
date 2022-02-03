import { Sprite } from "../base/Sprite";
import { Director } from "../Director";
import { canvas } from "../libs/weapp-adapter";

export class Pipe extends Sprite {
    constructor(image, top) {
        super(image, 
            0, 0, image.width, image.height, 
            canvas.width, 0,     // 从屏幕右侧边缘外产生
            image.width, image.height);

            this.top = top;
            this.moveSpeed = -Director.getInstance().moveSpeed;
    }
}