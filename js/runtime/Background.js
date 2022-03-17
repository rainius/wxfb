import { DataStore } from "../base/DataStore";
import { Sprite } from "../base/Sprite";
// 背景类
export class Background extends Sprite {
    constructor() {
        // 从DataStore获取背景图片对象
        //const image = this.dataStore.res.get("background");
        // 利用父类提供的工具方法获得背景图片对象
        const image = Sprite.getImage('background');
        // 向父类送入背景绘制需要的参数
        const canvas = DataStore.getInstance().canvas;
        super(image,    // 背景图片对象
            0, 0,       // 背景图片完整绘制
            image.width, image.height,
            0, 0,       // 绘制时充满画布
            canvas.width, canvas.height);
    }
}


