const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var character = new Image();
document.addEventListener('keydown', keyboard);
 document.addEventListener('keyup', keyboardPress);

const frameWidth = 108;
const frameHeight = 140;
character.src = './img/test.png';

var xPos = 20;
var yPos = 550;
var speed = 5;
let frameIndex = 0;
let count = 0;
var timer;

function animate(startIndex,endIndex,row) {
 
 
    count++;
    if (count > 5) {

        frameIndex++;
        count = 0;
    
    }

    if (frameIndex > endIndex) {
        frameIndex = startIndex;
    }
 
 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage( character, frameIndex * frameWidth, row * frameHeight, frameWidth, frameHeight, xPos, yPos, frameWidth, frameHeight);

    


 
}



function interval() {

    var timesRun = 0;
    timesRun += 1;
    if (timesRun === 1) {

       animate(0,0,4);

        clearInterval(timer);
       
    }

  //  animate(State.getState("stand"));


}


function keyboardPress(b) {

    if (b.keyCode == 68 || b.keyCode == 65) {


        timer = setInterval(interval, 1);

    }

}




    function keyboard(e) {
        if (e.keyCode == 68) {
            

            requestAnimationFrame(function () {
                clearInterval(timer);
                animate(0,6,2);
            });



            xPos += speed;

        }


        if (e.keyCode == 65) {

            requestAnimationFrame(function () {
                clearInterval(timer);
                animate(0,6,3);
            });

            xPos -= speed;


        }


    }

    

