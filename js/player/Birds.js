//小鸟类

import { DataStore } from "../base/DataStore";
import { Sprite } from "../base/Sprite";

export class Birds extends Sprite {
    constructor() {
        const image = Sprite.getImage('birds');
        super(image, 
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height);

            this.dataStore = DataStore.getInstance();

            //存储小鸟状态
            const BIRD_WIDTH = 34;   //小鸟宽度
            const BIRD_HEIGHT = 24;  //小鸟高度

            //小鸟在屏幕上的位置
            this.birdX = this.dataStore.canvas.width / 4;
            this.birdY = this.dataStore.canvas.height / 2;
            this.birdWidth = BIRD_WIDTH;
            this.birdHeight = BIRD_HEIGHT;

            this.y = this.birdY;

            //各序列帧位置和尺寸参数
            this.clippingX = [0, BIRD_WIDTH , BIRD_WIDTH * 2]   //3帧在图片中起始位置
            this.clippingY = [0, 0, 0];
            this.clippingWidth = [BIRD_WIDTH, BIRD_WIDTH, BIRD_WIDTH];
            this.clippingHeight = [BIRD_HEIGHT, BIRD_HEIGHT, BIRD_HEIGHT];


            
            //计数：显示哪一帧
            this.count = 0;
            //帧索引
            this.index = 0
            //重力方向计时
            this.time = 0;
    }

    // 飞行
    flyUp() {
        this.y = this.birdY;
        this.time = 0;
    }

    draw() {
        //重力加速度
        const g = 0.98 / 10;
        const offSetY = (g * this.time * (this.time - 30)) / 2;
        this.birdY = this.y + offSetY;
        this.time++;
        //实现小鸟振翅动画
        //定义动画帧切换间隔
        const interval = 5;
        //按帧绘制小鸟
        super.draw(this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdX, this.birdY,
            this.birdWidth, this.birdHeight);

        this.count = this.count + 1;
        if (this.count % interval == 0) {
            this.index = this.index + 1; 
            //索引值在0-2之间循环
            if (this.index > 2) {
                this.count = 0;
                this.index = 0;
            }
        }
    }
}