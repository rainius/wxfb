//导演类

import { DataStore } from "./base/DataStore";

export class Director {
    //导演只有一个，用单例实现
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    // 游戏核心逻辑
    run() {
        // console.log("DataStore: ", this.dataStore);
        // console.log("Background: ", this.dataStore.get('background'));
        // 找到背景精灵对象并执行绘制
        this.dataStore.get('background').draw();
    }
}