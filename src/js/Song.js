export default class Song extends Audio {
  constructor(title, src) {
    super(src);
    this.title = title
  }

  reset() {
    this.currentTime = 0;
  }

  setTime(time) {
    this.currentTime = time;
  }

  now() {
    return this.currentTime;
  }

  stop(){
    this.pause();
    this.currentTime = 0;
  }

  async isPlaying(){
    return !this.paused;
  }
}