import { DataStore } from "./base/DataStore";
import { ResourceLoader } from "./base/ResourseLoader"
import { Director } from "./Director";
import { Birds } from "./player/Birds";
import { Land } from "./player/Land";
import { Score } from "./player/Score";
import { StartBtn } from "./player/StartBtn";
import { Background } from "./runtime/Background";

const ctx = canvas.getContext('2d');

/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        console.log("创建Main对象");
  //   let image = new Image();
  //   image.src = 'images/background.png';
  //   image.onload = ()=>{
  //     ctx.drawImage(image,
  //       0, 0, 
  //       image.width, image.height,
  //       0, 0,
  //       image.width, image.height);
  //   }
    //初始化资源加载类
        // new ResourceLoader();
        //初始化数据存储类
        this.dataStore = DataStore.getInstance();
        //初始化导演
        this.director = Director.getInstance();
        //使用工厂方法创建loader
        const loader = ResourceLoader.create();
        loader.onload(map => this.onResourceFirstLoad(map));
    }

    onResourceFirstLoad(map) {
        //对DataStore进行测试
        //DataStore.getInstance();
        // 第一次完成加载时讲canvas、context、map对象存入DataStore
        console.log("Main.onResourceFirstLoad(): 填充DataStore[画布、上下文、图片资源]");
        this.dataStore = DataStore.getInstance();
        this.dataStore.canvas = canvas;
        this.dataStore.ctx = ctx;
        this.dataStore.res = map; //图片资源
        this.init();
    }

    init() {  
        //将游戏结束标记设置为false，游戏可以开始
        this.director.isGameOver = false;
        //将每个精灵放入DataStore中
        console.log("Main.init(): 添加背景Sprite对象到DataStore");
        this.dataStore.put('background', Background)
                .put('land', Land)
                .put('pipes', [])  // 2个管道同时出现
                .put('birds', Birds)
                .put('start_button', StartBtn)
                .put('score', Score);

        this.registerEvent();

        // 生成管道对
        this.director.createPipes();
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
                this.director.onTouch();
            }
        });
    }
}
