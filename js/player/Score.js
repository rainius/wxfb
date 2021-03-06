//计分器类

import { DataStore } from "../base/DataStore";

export class Score {
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.canvas = DataStore.getInstance().canvas;
        this.scoreNumber = 0;
    }

    increase() {
        console.log("Score increased.");
        this.scoreNumber++;
    }

    clear() {
        this.scoreNumber = 0;
    }

    draw() {
        
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = "#ffffff";
        // this.ctx.fillText(this.scoreNumber, this.canvas.width / 2, this.canvas.height / 18, 1000);
        this.ctx.fillText(this.scoreNumber, 10, 30);
    }
}