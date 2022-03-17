//不断移动的地面
import { DataStore } from "../base/DataStore";
import { Sprite } from "../base/Sprite";
import { Director } from "../Director";

export class Land extends Sprite {
    constructor() {
        const image = Sprite.getImage('land');
        super(image, 
            0, 0, image.width, image.height,
            // 计算地面在画布中的位置
            0, DataStore.getInstance().canvas.height - image.height,
            image.width, image.height);

        // 表示画布宽度的属性
        this.canvasWidth = DataStore.getInstance().canvas.width;
        this.landX = this.canvasWidth; //地面X坐标，从屏幕右边缘开始
        this.landSpeed = Director.getInstance().moveSpeed;
    }

    // 重写draw()以实现地面不停左移
    draw() {
        // 地面向左移动，每次需要减去速度值
        this.landX = this.landX - this.landSpeed;
        // 当后一个地面右边缘接触屏幕右边缘时，地面耗尽，重置
        if (this.landX <= this.canvasWidth - this.img.width) {
            this.landX = this.canvasWidth;
        }
        // 绘制两次地面，首位相接，则起点x坐标距离即为地面图片宽度
        super.draw(this.img, 
            this.srcX, this.srcY, this.srcW, this.srcH,
            this.landX - this.img.width, this.y, this.width, this.height);
        super.draw(this.img, 
            this.srcX, this.srcY, this.srcW, this.srcH,
            this.landX, this.y, this.width, this.height);
    }
}