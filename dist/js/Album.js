export default class Album {
  constructor(albumName, author, year, cover) {
    this.name = albumName;
    this.author = author;
    this.year = year;
    this.cover = cover;

    this.songList = [];
    this.songSelected = 0;
  }

  addTrackToAlbum(song) {
    this.songList.push(song);
  }
  
  removeTrackFromAlbum(songName) {
    this.songList.filter(songInList => songInList !== songName);
  }

  selectSong(index) {
    if (index <= 0) {
      this.songSelected = 0;
    } else if (index >= this.songList.length) {
      this.songSelected = 0;
    } else {
      this.songSelected = index;
    }
  }

  getCurrentSong() {
    console.log(this);
    return this.songList[this.songSelected];
  }

  getSongFromIndex(index) {
    return this.songList(index);
  }
}