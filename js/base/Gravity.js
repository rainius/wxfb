//物理引擎之重力组件
export class Gravity {
    //提供重力加速度，缺省为地球重力加速度
    constructor(g=9.8) {
        this.g = g;
    }
    /**
     * 计算自由落体运动下落距离
     * @param {下落时间} t 
     */
    freeFalling(t) {
        return (this.g * t * t) / 2;
    }
}