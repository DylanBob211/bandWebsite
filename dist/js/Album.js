export default class Album {
  constructor(albumName, author, year, cover) {
    this.name = albumName;
    this.author = author;
    this.year = year;
    this.cover = cover;

    this.songList = [];
  }

  addTrackToAlbum(song) {
    this.songList.push(song);
  }
  
  removeTrackFromAlbum(songName) {
    this.songList.filter(songInList => songInList !== songName);
  }
}