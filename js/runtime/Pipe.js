//水管（障碍物）基类
import { DataStore } from "../base/DataStore";
import { Sprite } from "../base/Sprite";
import { Director } from "../Director";

export class Pipe extends Sprite {
    constructor(image, top) {
        const cvs = DataStore.getInstance().canvas;
        //初始化时确定图片对象和Y坐标
        super(image,
            0, 0, image.width, image.height,
            //初始X坐标在屏幕右边缘外
            cvs.width, 0, image.width, image.height);
        //新增top属性和moveSpeed属性
        this.top = top;
        this.moveSpeed = Director.getInstance().moveSpeed;
    }

    //重写
    draw() {
        this.x = this.x - this.moveSpeed;   //随帧移动
        super.draw(this.img, 
            0, 0, this.width, this.height, 
            this.x, this.y, this.width, this.height);
    }

}
