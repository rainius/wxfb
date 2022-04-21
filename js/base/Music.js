/**
  * 统一的音效管理器
  */
export default class Music {

    static getInstance() {
        // 音乐类持有一个自己的静态实例instance
        if (!Music.instance) {   // 如果instance为空就new一个
            Music.instance = new Music();
        }
        return Music.instance;
    }

    constructor() {
        // 背景音乐
        this.bgmAudio = new Audio()
        this.bgmAudio.loop = true
        this.bgmAudio.src = 'audio/bgm.mp3'
        // 翅膀扇动音效
        this.wingAudio = new Audio()
        this.wingAudio.src = 'audio/wing.wav'
        // 得分音效
        this.scoreAudio = new Audio()
        this.scoreAudio.src = 'audio/point.wav'
        // 撞击音效
        this.hitAudio = new Audio()
        this.hitAudio.src = 'audio/hit.wav'

        this.playBgm()
    }

    playBgm() {
        this.bgmAudio.play()
    }

    playWing() {
        this.wingAudio.currentTime = 0
        this.wingAudio.play()
    }

    playScore() {
        this.scoreAudio.currentTime = 0
        this.scoreAudio.play()
    }

    playHit() {
        this.hitAudio.currentTime = 0
        this.hitAudio.play()
    }
}