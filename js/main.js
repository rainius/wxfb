

const ctx = canvas.getContext('2d')

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    let image = new Image();
    image.src = 'images/bg.jpg';
    image.onload = ()=>{
      ctx.drawImage(image,
        0, 0, 
        image.width, image.height,
        0, 0,
        image.width, image.height);
    }
  }

}
