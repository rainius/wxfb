//全局数据存储类
export class DataStore {

    //单例模式，保持取得的对象全局唯一
    static getInstance() {
        //如果还未创建唯一实例则创建之
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    constructor() {
        this.map = new Map();   //保存数据在map成员中
        console.log("创建DataStore");
    }

    put(key, value) {   //存储变量
        //传入的是类（JS将其理解为函数），则创建一个对象
        if (typeof value === 'function') {
            value = new value();
        }
        //变量存入map
        this.map.set(key, value);
        return this;
    }
    
    get(key) {  //获取存储的数据
        return this.map.get(key);
    }

    destroy() {
        //map中所有变量置空
        for(let value of this.map.values()) {
            value = null;
        }
    }
}
