document.onkeydown = event => {
    key = event || window.event;
    if (key.keyCode == '39') {
        
        return plusDivs(1)      // right arrow
    }
    else if (key.keyCode == '37') {
        
        return plusDivs(-1)      // left arrow
    }
}