//变量存储，方便在不同类中访问和修改变量

export class DataStore {
    //单例模式，保持取得的对象全局唯一
    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    constructor() {
        this.map = new Map();
        console.log("Build the DataStore");
    }

    put(key, value) {   //存储变量
        if (typeof value === 'function') {
            //传入的是函数，则创建一个对象
            value = new value();
        }
        //变量存入map
        this.map.set(key, value);
        return this;
    }

    get(key) {
        return this.map.get(key);
    }

    destroy() {
        //map中所有变量置空
        for(let value of this.map.values()) {
            value = null;
        }
    }
}