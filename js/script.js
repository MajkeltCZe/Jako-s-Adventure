const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const narrator = document.getElementById('narrator');
const options = document.getElementById('options');
const play = document.getElementById('play');
const frameWidth = 108;
const frameHeight = 140;
let frameIndex = 0, count = 0, bg = 0;
var timer,cutscene,playable = true;

let story = 1;
let state = [];
let img = [];

for (let i = 0; i < 5; i++) {
    img[i] = new Image;
    img[i].src = './img/' + i + '.png';

}


play.addEventListener('click', () => {
    narrator.style.display = "block";
    play.style.display = "none";
    clearInterval(cutscene);
    document.body.style.backgroundImage = "url(./img/backgrounds.jpg)";
    canvas.width = 1110;
  canvas.height = 420;
  animate(3,Jako.x,Jako.y,0, 0, 4);
});





const Jako = {
x:20,
y: 280,
speed: 5,
img: 3,
keyboardPressed: function(e) {
    if (e.keyCode == 39 || e.keyCode == 37) {
        requestAnimationFrame(function () {
            animate(Jako.img,Jako.x,Jako.y,0, 0, 4);
        });

    }
},

 keyboard: function(e) {
    if (e.keyCode == 39) {
        if (playable == true) {
            requestAnimationFrame(function () {
                animate(Jako.img,Jako.x,Jako.y,0, 4, 2);
            });


            if (bg == 2 && Jako.x >= (canvas.width - 80)) {
               Jako.x = Jako.x;

            }
            else {
                Jako.x += Jako.speed;
            }
        }
    }

    if (e.keyCode == 37) {
        if (playable == true) {
            requestAnimationFrame(function () {
                clearInterval(timer);

                animate(Jako.img,Jako.x,Jako.y,0, 4, 3);
            });

            if (bg == 0 && Jako.x <= 10) {
                Jako.x = Jako.x;

            }
            else {
                Jako.x -= Jako.speed;
            }
        }
    }
    ChangeBackground();
    // Storytelling();

}
}
document.addEventListener('keydown', Jako.keyboard);
document.addEventListener('keyup', Jako.keyboardPressed);

function animate(i,xPos,yPos,startIndex, endIndex, row) {
    count++;
    if (count > 3) {

        frameIndex++;
        count = 0;

    }

    if (frameIndex > endIndex) {
        frameIndex = startIndex;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.drawImage(img[bg], 0, 0);
    ctx.drawImage(img[i], frameIndex * frameWidth, row * frameHeight, frameWidth, frameHeight, xPos, yPos, frameWidth, frameHeight);


}


function ChangeBackground()  {

    if (Jako.x >= canvas.width - 70) {
        bg++;
        Jako.x = 1;
    }

    if (Jako.x <= 0) {
        bg--;
        Jako.x = canvas.width - 70;
    }

}














