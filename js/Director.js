//导演类

import { DataStore } from "./base/DataStore";
import { UpPipe } from "./player/UpPipe";
import { DownPipe } from "./player/DownPipe";

export class Director {
    //导演只有一个，用单例实现
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        console.log("创建全局Director对象");
        this.dataStore = DataStore.getInstance();
        //定义飞行速度
        this.moveSpeed = 2;
        // 游戏结束标记
        this.isGameOver = false;
    }

    //产生管道对
    createPipes() {
        // 管道显示范围约束
        const minTop = this.dataStore.canvas.height / 8;
        const maxTop = this.dataStore.canvas.height / 2;
        // 随机产生当前实例top值
        const top = minTop + Math.random() * (maxTop - minTop);
        let pipes = this.dataStore.get('pipes');
        pipes.push(new UpPipe(top));
        pipes.push(new DownPipe(top));
    }

    //定义触屏事件的响应函数
    onTouch() { 
        this.dataStore.get('birds').flyUp();
    }

    //检测小鸟是否碰撞水管或地面
    check() {
        const birds = this.dataStore.get('birds');
        //地面碰撞
        const land = this.dataStore.get('land');
        if (birds.birdY + birds.birdHeight >= land.y) {
            console.log("撞击地面");
            this.isGameOver = true;
        }
        //碰撞水管
        const pipes = this.dataStore.get('pipes');
        //小鸟边框模型
        const birdsBorder = {
            top: birds.y,  
            bottom: birds.birdY + birds.birdHeight,
            left: birds.birdX,
            right: birds.birdX + birds.birdWidth
        };

        //管道边框模型
        const length = pipes.length;
        for (let i = 0; i < length; i++) {
            const pipe = pipes[i];
            const pipeBorder = {
                top: pipe.y,
                bottom: pipe.y + pipe.height,
                left: pipe.x,
                right: pipe.x + pipe.width
            }

            if (Director.isCollisionDetected(birdsBorder, pipeBorder)) {
                console.log("小鸟撞水管了");
                this.isGameOver = true;
            }
        }
    }

    //碰撞检测函数
    static isCollisionDetected(birdsBorder, pipeBorder) {
        let s = true;
        if (birdsBorder.top > pipeBorder.bottom ||
            birdsBorder.bottom < pipeBorder.top ||
            birdsBorder.left > pipeBorder.right ||
            birdsBorder.right < pipeBorder.left) {
            s = false;
        }
        return s;
    }

    // 游戏核心逻辑
    run() {
        this.check();
        if (!this.isGameOver) {  //游戏结束标记
            // console.log("DataStore: ", this.dataStore);
            // console.log("Background: ", this.dataStore.get('background'));
            // 找到背景精灵对象并执行绘制
            //console.log("Director.run(): 执行核心逻辑");
            this.dataStore.get('background').draw();
            
            const pipes = this.dataStore.get('pipes');

            //水管离开屏幕后清除掉
            if (pipes[0].x + pipes[0 ].width <= 0 && pipes.length == 4) {
                pipes.shift();
                pipes.shift();    
            }
            
            //是否产生新的水管组
            if (pipes[0].x <= (this.dataStore.canvas.width - pipes[0].width) / 2 && pipes.length == 2) {
                this.createPipes();
            }
            
            this.dataStore.get('pipes').forEach(function (values) {
                values.draw();
            });
            
            this.dataStore.get('land').draw();
            this.dataStore.get('birds').draw();

            // 定时器，产生动画绘制间隔
            const timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);
        } else {    // 游戏结束
            console.log("游戏结束");
            // 游戏结束，显示开始按钮
            this.dataStore.get('start_button').draw();
            //取消动画帧
            cancelAnimationFrame(this.dataStore.get('timer'));  
            //清除所有对象
            this.dataStore.destroy();
        }
    }
}