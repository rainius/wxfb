// 精灵基类
// 负责初始化精灵加载资源和大小以及位置
import { DataStore } from "./DataStore";
export class Sprite {
    // 构造方法，初始化持有的Image对象及绘制相关参数
    constructor(img = null,
        srcX = 0, srcY = 0,
        srcW = 0, srcH = 0,
        x = 0, y = 0,
        width = 0, height = 0) {
        this.dataStore = DataStore.getInstance();
        this.ctx = this.dataStore.ctx;
        // 为精灵的各属性赋值
        this.img = img;
        this.srcX = srcX;
        this.srcY = srcY;
        this.srcW = srcW;
        this.srcH = srcH;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    /**
     * img 持有的图片对象
     * srcX 裁剪起点X坐标
     * srcY 裁剪起点Y坐标
     * srcW 裁剪区域宽度
     * srcH 裁剪区域高度
     * x 在画布上的绘制起点X坐标
     * y 在画布上的绘制起点Y坐标
     * width 绘制宽度
     * height 绘制高度
     */

    // 根据参数绘制精灵
    // 可以通过参数控制绘制，也可以按精灵对象自身属性绘制
    draw(img = this.img,
        srcX = this.srcX, srcY = this.srcY,
        srcW = this.srcW, srcH = this.srcH,
        x = this.x, y = this.y,
        width = this.width, height = this.height) {
        this.ctx.drawImage(img, srcX, srcY, srcW, srcH, x, y, width, height);
    }

    /**
     * 工具函数：从DataStore获取name对应的图片对象
     */
    static getImage(name) {
        return DataStore.getInstance().res.get(name);
    }
}

