//小鸟类
import { DataStore } from "../base/DataStore";
import { Gravity } from "../base/Gravity";
import { Sprite } from "../base/Sprite";

export class Bird extends Sprite {
    constructor() {
        const image = Sprite.getImage('bird');
        super(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
        this.time = 0;  //重力方向计时
        const g = 0.98 / 10; //重力加速度
        //增加重力属性
        this.gravity = new Gravity(g);
        const BIRD_WIDTH = 34;   //小鸟宽度
        const BIRD_HEIGHT = 24;  //小鸟高度
        //定义小鸟本身的宽、高属性
        this.birdWidth = BIRD_WIDTH;
        this.birdHeight = BIRD_HEIGHT;
        const dataStore = DataStore.getInstance();
        //小鸟绘制在屏幕上的位置
        this.birdX = dataStore.canvas.width / 4;
        this.birdY = dataStore.canvas.height / 2;
        //3帧在图片中起始位置
        this.clippingX = [0, BIRD_WIDTH , BIRD_WIDTH * 2];   
        this.clippingY = [0, 0, 0];
        //3帧各自的尺寸
        this.clippingWidth = [BIRD_WIDTH, BIRD_WIDTH, BIRD_WIDTH];
        this.clippingHeight = [BIRD_HEIGHT, BIRD_HEIGHT, BIRD_HEIGHT];
        this.speed = 5; // 每3帧切换图片
        this.count = 0; // 帧计数变量
        this.index = 0; // 动画帧索引[0,2]
        //向上的速度
        this.speedUp = -2;
        //记录初始高度
        this.y = this.birdY;
    }

    //小鸟的飞行
    flyUp() {
        //将飞行时间置为0
        this.time = 0; 
        this.y = this.birdY;
    }

    draw() {
        //计算随时间自由落体位移量
        // const offSetY = this.gravity.freeFalling(this.time);
        const offSetY = this.speedUp * this.time + this.gravity.freeFalling(this.time);
        this.birdY = this.y + offSetY;

        this.time++;
        //实现小鸟振翅动画
        super.draw(this.img,
            this.clippingX[this.index], this.clippingY[this.index], //当前动画帧起始点
            this.clippingWidth[this.index], this.clippingHeight[this.index], //当前动画帧尺寸
            this.birdX, this.birdY, 
            this.clippingWidth[this.index], this.clippingHeight[this.index]);

        this.count++;    // 每刷新一次，帧计数增1
        if (this.count % this.speed == 0) { // 需要切换动画帧
            this.index = this.index + 1;    // 索引指向下一动画帧
            //索引值在0-2之间循环
            if (this.index > 2) {
                this.count = 0;
                this.index = 0;
            }
        }
    }
}