import { ResourceLoader } from "./base/ResourseLoader"


const ctx = canvas.getContext('2d')

/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
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
        //使用工厂方法创建loader
        const loader = ResourceLoader.create();
        loader.onload(map => this.onResourceFirstLoad(map));
      
    }

    onResourceFirstLoad(map) {
          console.log(map);
    }
}
