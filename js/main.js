import { DataStore } from "./base/DataStore";
import { ResourceLoader } from "./base/ResourseLoader"

const ctx = canvas.getContext('2d')
/**
 * 游戏主类
 */
export default class Main {
    // 构造方法：程序逻辑的入口
    constructor() {
        // new ResourceLoader();
        //使用工厂方法创建loader
        const loader = ResourceLoader.create();
        //注入回调函数，加载完毕时调用
        loader.onload(map => this.onResourceFirstLoad(map));

        DataStore.getInstance();
        DataStore.getInstance();
        DataStore.getInstance();

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

    onResourceFirstLoad(map) {
        //console.log("Main", map);
        this.dataStore = DataStore.getInstance();
        this.dataStore.ctx = ctx;   //存储上下文对象
        this.dataStore.canvas = canvas; //存储画布对象
        this.dataStore.res = map;   //存储图片资源map
    }
}
