import { ResourceLoader } from "./base/ResourseLoader"

const ctx = canvas.getContext('2d')
/**
 * 游戏主类
 */
export default class Main {
    // 构造方法：程序逻辑的入口
    constructor() {
        new ResourceLoader();
        // //加载图片
        // let image = new Image();
        // image.src = "images/background.png";
        // // 图片加载完毕
        // image.onload = () => {
        //     //绘制背景图
        //     ctx.drawImage(image,
        //         0, 0, 
        //         image.width, image.height,
        //         0, 0,
        //         image.width, image.height);
        // };
    }
}
