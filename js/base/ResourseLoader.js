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
}