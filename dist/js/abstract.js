function removeLastFaToken(btn){
    btn.classList.forEach( el => {
        if(el === "fa" || el === "mp3-btns"){
            return true;
        } else {
            btn.classList.remove(el);
        }
    })
}

export function volBtnIcon(song){
    const volBtn = document.getElementById("volume");
    
    if(song.volume == 0){
        removeLastFaToken(volBtn);
        volBtn.classList.add('fa-volume-off')
        
    } else if(song.volume <= 0.5){
        removeLastFaToken(volBtn);
        volBtn.classList.add('fa-volume-down')
        
    } else if(song.volume < 1.0){
        removeLastFaToken(volBtn);
        volBtn.classList.add('fa-volume-up')
        
    }
}

export function updateSongDuration(song) {
    //change time next to the bar
    const songbar = document.querySelector('#song-bar');
    let totalDuration = sec2time(song.duration);
    songbar.setAttribute('data-after', totalDuration);
    
}

function sec2time(timeInSeconds) {
    var pad = function(num, size) { return ('000' + num).slice(size * -1); },
    time = parseFloat(timeInSeconds).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60),
    milliseconds = time.slice(-3);

    return pad(minutes, 1) + '.' + pad(seconds, 2);
}

export function songDataUpdate(song) {
    const title = document.querySelector('#songtitle');
    const author = document.querySelector('#songauthor');

    title.innerHTML = song.title;
    author.innerHTML = song.author;

    updateSongDuration(song);
    setSongCurrentTimeOnScreen(song);
}

export function setSongCurrentTimeOnScreen(song){
    const songBar = document.querySelector('#song-bar');
    songBar.setAttribute('data-before', sec2time(song.currentTime));   
}