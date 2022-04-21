import { DataStore } from "./base/DataStore";
import { ResourceLoader } from "./base/ResourseLoader"
import { Director } from "./Director";
import { Bird } from "./player/Birds";
import { Score } from "./player/Score";
import { StartBtn } from "./player/StartBtn";
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
        //将游戏结束标记设置为false，游戏可以开始
        this.director.isGameOver = false;
        //创建各精灵对象并装入DataStore
        this.dataStore.put("background", new Background) // 背景
                      .put("land", new Land) //地面
                      .put("pipes", [])    //水管对应数组
                      .put('birds', new Bird)   //填加小鸟实例到全局存储
                      .put('score', Score)//计分器实例
                      .put('start_button', StartBtn); //填加开始按钮实例到全局存储
        //注册事件监听
        this.registerEvent();
        
                      // 生成管道对
        this.director.createPipes();
        
        /* 交给导演来做：
             //验证：获取背景对象并绘制
                const backgroundSprite = this.dataStore.get("background");
                backgroundSprite.draw();
        */
        // 导演启动游戏主逻辑
        this.director.run();
    }

    //注册点击事件
    registerEvent() {
        console.log("Register event");
        canvas.addEventListener('touchstart', e => {
            console.log("Touch on the screen");
            //屏蔽事件冒泡
            e.preventDefault();
            if (this.director.isGameOver) {
                // 当游戏出于结束状态，点击屏幕开始游戏
                console.log("游戏开始");
                this.init();
            } else {
                //通知导演发生触屏事件
                this.director.onTouch();
            }
        });
    }
}
