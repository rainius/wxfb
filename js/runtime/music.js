let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if (instance) return instance

    instance = this

    this.bgmAudio = new Audio()
    this.bgmAudio.loop = true
    this.bgmAudio.src = 'audio/bgm.mp3'

    this.wingAudio = new Audio()
    this.wingAudio.src = 'audio/wing.wav';

    this.scoreAudio = new Audio()
    this.scoreAudio.src = 'audio/point.wav'

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
