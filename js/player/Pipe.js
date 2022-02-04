import { Sprite } from "../base/Sprite";
import { Director } from "../Director";
import { canvas } from "../libs/weapp-adapter";

export class Pipe extends Sprite {
    constructor(image, top) {
        super(image, 
            0, 0, image.width, image.height, 
            canvas.width, 0,     // 从屏幕右侧边缘外产生
            image.width, image.height);
            //描述水管高度的属性
            this.top = top;
            //运动速度
            this.moveSpeed = -Director.getInstance().moveSpeed; 
    }

    //重写
    draw() {
        this.x = this.x + this.moveSpeed;   //随帧移动
        super.draw(this.img, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}