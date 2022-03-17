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
        // 定义场景移动速度：像素/帧
        this.moveSpeed = 2; 
    }

    // 游戏核心逻辑
    run() {
        //找到背景精灵对象并执行绘制
        //此处采用默认值绘制
        this.dataStore.get('background').draw();   
        //绘制地面 
        this.dataStore.get('land').draw();  

        //实现动画：循环重绘场景
        let timer = requestAnimationFrame(() => this.run());
        this.dataStore.put('timer', timer); // 保存以便将来停止动画
    }
}

