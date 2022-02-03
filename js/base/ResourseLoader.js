//资源加载类，确保canvas在图片资源加载完成后才进行渲染
import { Resources } from "./Resource";

export class ResourceLoader {
    constructor() {
        console.log("创建ResourceLoader对象实例");
        //资源描述全部装到map里以便根据名字来访问
        this.map = new Map(Resources);
        for (let [key, value] of this.map) {
            // console.log(key, value);
            const image = new Image();
            image.src = value;  //导入的Resource中的路径
            this.map.set(key, image);
        }
        // console.log(this.map);
    }

    //注入回调函数
    onload(callback) {
        console.log("ResourceLoader.onload()");
        // 计数
        let loadCount = 0;
        for (let value of this.map.values()) {      //获取所有的图片对象
            value.onload = () => {                  //图片加载函数
                loadCount++;                        //加载计数
                if (loadCount >= this.map.size) {
                    console.log("ResourceLoader.onload(): 图片资源加载完毕。");
                    callback(this.map);             //资源已经全部加载，则调用callback
                }
            }
        }
    }

    //工厂方法
    static create() {
        return new ResourceLoader();
    }
}