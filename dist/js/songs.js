import { songList } from "./mp3-player.js";

export default class Song extends Audio {
  constructor(title, author, src, poster){
    super(src);
    this._title = title;
    this._author = author;
    this.poster = poster;
    
    this.listHTMLElement;
    this.addToTracklist(songList);

    this.songIsSelected;
  }
  

  get title(){
    return this._title;
  }
  get author(){
    return this._author;
  }

  addToTracklist(array){
    array.push(this);
    this.create()
  }
  
  create() {
    this.listHTMLElement = document.createElement('li');
    let textInElement = document.createTextNode(this.title);
    this.listHTMLElement.appendChild(textInElement);
    const list = document.querySelector('#songlist').childNodes[1];
    list.appendChild(this.listHTMLElement);
    this.listHTMLElement.classList.add('song-item');   
    console.log(this.listHTMLElement);
  }

  stop(){
      this.pause();
      this.currentTime = 0;
  }    
}

