export function removeLastFaToken(btn){
    btn.classList.forEach( el => {
        if(el === "fa" || el === "mp3-btns"){
            return true;
        } else {
            btn.classList.remove(el);
        }
    })
}