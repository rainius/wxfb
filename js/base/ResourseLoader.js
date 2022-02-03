//资源加载类，确保canvas在图片资源加载完成后才进行渲染

import { Resources } from "./Resource";

export class ResourceLoader {
    constructor() {
        //资源描述全部装到map里以便根据名字来访问
        this.map = new Map(Resources);
        for (let [key, value] of this.map) {
            console.log(key, value);
            const image = new Image();
            image.src = value;  //导入的Resource中的路径
            this.map.set(key, image);
        }
        console.log(this.map);
    }
}