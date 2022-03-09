//资源加载类
import { Resources } from "./Resourse";

export class ResourceLoader {
    constructor() {
        //用map来放置全部资源
        this.map = new Map(Resources);
        //用实际的Image对象代替图片路径
        for (let [key, value] of this.map) {
            console.log(key, value);
            const image = new Image();
            image.src = value;
            //用Image对象替换图片路径字符串
            this.map.set(key, image);
        }
        console.log(this.map);
    }

    //注入回调函数
    onload(callback) {
        // 计数
        let loadCount = 0;
        for (let value of this.map.values()) {      //获取所有的图片对象
            //图片加载完毕通知函数
            value.onload = () => {
                //加载计数               
                loadCount++;
                if (loadCount >= this.map.size) {
                    //资源已经全部加载，则调用外部注入的callback
                    callback(this.map);
                }
            }
        }
    }
    
}