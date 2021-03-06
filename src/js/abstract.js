export function removeLastFaToken(btn){
    btn.classList.forEach( el => {
        if(el === "fa" || el === "mp3-btns"){
            return true;
        } else {
            btn.classList.remove(el);
        }
    })
}

export function sec2time(timeInSeconds) {
    var pad = function(num, size) { return ('000' + num).slice(size * -1); },
    time = parseFloat(timeInSeconds).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60),
    milliseconds = time.slice(-3);

    return pad(minutes, 1) + '.' + pad(seconds, 2);
}
