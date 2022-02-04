//下面的水管

import { DataStore } from "../base/DataStore";
import { Sprite } from "../base/Sprite";
import { canvas } from "../libs/weapp-adapter";
import { Pipe } from "./Pipe";

export class UpPipe extends Pipe {
    constructor(top) {
        const image = Sprite.getImage('pipeDown');
        super(image, top)
    }

    //重写
    draw() {
        //设定上下水管之间的间距
        let gap = canvas.height / 5;
        //计算下方水管在画布中的位置
        this.y = this.top + gap;
        super.draw();
    }
}