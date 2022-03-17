//导演类，控制游戏逻辑
import { DataStore } from "./base/DataStore";
export class Director {

    //导演只有一个，用单例实现
    static getInstance() {
        // 类持有一个自己的静态实例instance
        if (!Director.instance) {   // 如果instance为空就new一个
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        // 持有数据存储对象
        this.dataStore = DataStore.getInstance();
    }

    // 游戏核心逻辑
    run() {
        //找到背景精灵对象并执行绘制
        //此处采用默认值绘制
        this.dataStore.get('background').draw();    
    }
}

