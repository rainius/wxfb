//导演类，控制游戏逻辑
import { DataStore } from "./base/DataStore";
import { UpPipe } from "./runtime/UpPipe";
import { DownPipe } from "./runtime/DownPipe";
import Music from "./base/Music";
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
        // 进入计分区标记
        this.inScoreArea = false;
        // 离开计分区标记
        this.outScoreArea = true;
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
        //播放音效
        Music.getInstance().playWing();
        this.dataStore.get('birds').flyUp();
    }

    //检测小鸟是否碰撞水管或地面
    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        console.log("检测 撞击地面： ", birds.birdY, birds.birdHeight, land.y);
        //检测与地面的碰撞
        if (birds.birdY + birds.birdHeight >= land.y) {
            console.log("撞击地面");
            this.isGameOver = true;
            //播放音效
            Music.getInstance().playHit();
            return;
        }
        //检测与水管的碰撞
        //小鸟边框模型
        const birdsBorder = {
            top: birds.y,
            bottom: birds.birdY + birds.birdHeight,
            left: birds.birdX,
            right: birds.birdX + birds.birdWidth
        };
        //遍历每个管道
        const pipes = this.dataStore.get('pipes');
        const length = pipes.length;
        for (let i = 0; i < length; i++) {
            const pipe = pipes[i];
            //管道边界
            const pipeBorder = {
                top: pipe.y,
                bottom: pipe.y + pipe.height,
                left: pipe.x,
                right: pipe.x + pipe.width
            }
            //检查当前水管与小鸟是否碰撞
            if (Director.isCollisionDetected(birdsBorder, pipeBorder)) {
                console.log("小鸟撞水管了");
                //播放音效
                Music.getInstance().playHit();
                this.isGameOver = true;
                break;
            }
        }

        //计分逻辑
        for (let j = 0; j < length; j += 2) {
            const pipeTop = pipes[j];
            //得分区边界：已经过碰撞检测，只考虑x方向边界
            const scoreAreaBorder = {
                left: pipeTop.x,
                right: pipeTop.x + pipeTop.width
            }
            const score = this.dataStore.get('score');  //取计分对象
            if (!Director.isInScoreArea(birdsBorder, scoreAreaBorder)) {//不在得分区
                this.outScoreArea = true;
                if (this.inScoreArea) {
                    //如果前一状态仍然表示停留在得分区，则表明：
                    //小鸟刚刚安全通过得分区，应当加分
                    this.inScoreArea = false;
                    score.increase();
                    //播放音效
                    Music.getInstance().playScore();
                    break;
                }
            } else {   // 当前进入得分区
                this.inScoreArea = true;
                this.outScoreArea = false;
                break;
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
    //小鸟是否进入得分区
    static isInScoreArea(birdsBorder, scoreAreaBorder) {
        if (birdsBorder.left > scoreAreaBorder.right ||
            birdsBorder.right < scoreAreaBorder.left) {
            return false;
        } else {
            return true;
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
            if (pipes[0].x + pipes[0].width <= 0 && pipes.length == 4) {
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
            this.dataStore.get('score').draw(); // 绘制得分
        } else {    // 游戏结束
            console.log("游戏结束");
            // 分数清零
            this.dataStore.get('score').clear();
            this.inScoreArea = false;
            this.outScoreArea = false;
            // 游戏结束，显示开始按钮
            this.dataStore.get('start_button').draw();
            //取消动画帧
            cancelAnimationFrame(this.dataStore.get('timer'));
            //清除所有对象
            this.dataStore.destroy();
        }
    }
}

