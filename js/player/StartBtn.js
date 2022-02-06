// 开始按钮类
import { DataStore } from "../base/DataStore";
import { Sprite } from "../base/Sprite";

export class StartBtn extends Sprite {
    constructor() {
        const canvas = DataStore.getInstance().canvas;
        const image = Sprite.getImage('start_button');
        super(image,
            0, 0, 
            image.width, image.height,
            (canvas.width - image.width) / 2, (canvas.height - image.height) / 2.5, //屏幕居中偏上
            image.width, image.height);
    }
}