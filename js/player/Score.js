//计分器类

import { DataStore } from "../base/DataStore";

export class Score {
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.canvas = DataStore.getInstance().canvas;
        //分数值属性
        this.scoreNumber = 0;
    }

    //增加分数
    increase() {
        console.log("Score increased.");
        this.scoreNumber++;
    }

    //分数清零
    clear() {
        this.scoreNumber = 0;
    }
    
    draw() {
        this.ctx.font = '25px Arial';
        this.ctx.fillstyle = "#d89c36";
        this.ctx.fillText(this.scoreNumber, this.canvas.width / 2, this.canvas.height / 18, 1000);
    }
}