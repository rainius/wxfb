//导演类，控制游戏逻辑
import { DataStore } from "./base/DataStore";
import { UpPipe } from "./runtime/UpPipe";
import { DownPipe } from "./runtime/DownPipe";
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
        //小鸟进行一次振翅飞行
        this.dataStore.get('birds').flyUp();
    }

    //检测小鸟是否碰撞水管或地面
    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        console.log("检测 撞击地面： ", birds.birdY, birds.birdHeight,land.y);
        if (birds.birdY + birds.birdHeight >= land.y) {
            console.log("撞击地面");
            this.isGameOver = true;
        }
    }

    // 游戏核心逻辑
    run() {
        //进行碰撞检查
        this.check();
        if (!this.isGameOver) { //只有当游戏未结束时才运行游戏场景
            //找到背景精灵对象并执行绘制
            //此处采用默认值绘制
            this.dataStore.get('background').draw();   
            
            //是否产生新的水管组
            const pipes = this.dataStore.get('pipes');
            //水管离开屏幕后清除掉
            if (pipes[0].x + pipes[0 ].width <= 0 && pipes.length == 4) {
                //将退出场景的一组水管从数组中移除
                pipes.shift();
                pipes.shift();    
            }
            //前一组水管越过中线，且场景中仅有1组水管
            const cvs = this.dataStore.canvas;
            if (pipes[0].x <= (cvs.width - pipes[0].width) / 2 && pipes.length == 2) {
                this.createPipes();
            }
            //绘制水管
            this.dataStore.get('pipes').forEach(function (values) {
                values.draw();
            });
            //绘制地面 
            this.dataStore.get('land').draw();  

            //实现动画：循环重绘场景
            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer); // 保存以便将来停止动画


            this.dataStore.get('birds').draw();
        } else {    // 游戏结束
            console.log("游戏结束");
            //取消动画帧
            cancelAnimationFrame(this.dataStore.get('timer'));
            //清除所有对象
            this.dataStore.destroy();
        }
    }
}

