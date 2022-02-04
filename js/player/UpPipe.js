//上面的水管
import { Pipe } from "./Pipe";
import { Sprite } from "../base/Sprite";

export class UpPipe extends Pipe {
    constructor(top) {
        const image = Sprite.getImage('pipe_up');
        super(image, top)
    }

    //重写
    draw() {
        //计算水管在画布上实际的绘制高度
        this.y = this.top - this.height;
        super.draw();
    }
}