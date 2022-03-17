import { DataStore } from "./base/DataStore";
import { ResourceLoader } from "./base/ResourseLoader"
import { Director } from "./Director";
import { Background } from "./runtime/Background";
import { Land } from "./runtime/Land";

const ctx = canvas.getContext('2d')
/**
 * 游戏主类
 */
export default class Main {
    // 构造方法：程序逻辑的入口
    constructor() {
        //初始化导演
        this.director = Director.getInstance();

        // new ResourceLoader();
        //使用工厂方法创建loader
        const loader = ResourceLoader.create();
        //注入回调函数，加载完毕时调用
        loader.onload(map => this.onResourceFirstLoad(map));
    }

    onResourceFirstLoad(map) {
        //console.log("Main", map);
        this.dataStore = DataStore.getInstance();
        this.dataStore.ctx = ctx;   //存储上下文对象
        this.dataStore.canvas = canvas; //存储画布对象
        this.dataStore.res = map;   //存储图片资源map
        console.log("DataStore: ", this.dataStore);
        this.init();
    }

    init() {
        //创建各精灵对象并装入DataStore
        this.dataStore.put("background", new Background) // 背景
                      .put("land", new Land); //地面
        /* 交给导演来做：
             //验证：获取背景对象并绘制
                const backgroundSprite = this.dataStore.get("background");
                backgroundSprite.draw();
        */
        // 导演启动游戏主逻辑
        this.director.run();
    }
}
