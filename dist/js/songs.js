export class Song extends Audio{
    constructor(title, author, src, poster){
        
        super(src);
        this._title = title;
        this._author = author;
        this.poster = poster;

    }
    

    get title(){
        return this._title;
    }
    get author(){
        return this._author;
    }

    addToTracklist(array){
        array.push(this);
    }
    stop(){
        this.pause();
        this.currentTime = 0;
    }
}