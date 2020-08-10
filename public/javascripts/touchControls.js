document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    const firstTouch = evt.changedTouches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(event) {
    if (!xDown || !yDown) {
        return;
    }
    var threshhold = 5;            //required min distance traveled to be considered swipe
    var xUp = event.touches[0].clientX;
    var yUp = event.touches[0].clientY;

    var xDiff = xDown - xUp;    //For Horizontal distance traveled
    var yDiff = yDown - yUp;    //For Vertical distance traveled  

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0 && Math.abs(xDiff) >= threshhold ) {  //Condition for Horizontal swipes
           
            plusDivs(-1);       //Left Swipe

        } else if(xDiff < 0 && Math.abs(xDiff) >= threshhold ) {
           
            plusDivs(1);         //Right Swipe
        }
    } 
    xDown = null;
    yDown = null;
};