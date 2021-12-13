const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var character = new Image();
document.addEventListener('keydown', keyboard);
const frameWidth = 108;
const frameHeight = 140;
character.src = './img/test.png';

var xPos = 20;
var yPos = 550;
var srcX;
var srcY;
var speed = 10;
const fps = 60;
const secondsToUpdate = 0.06 * fps;
let frameIndex = 0;
let count = 0;

// stavy animaci
const State = {
    states: {},
    generateState: function (name, startIndex, endIndex, row) {
        if (!this.states[name]) {
            this.states[name] = {
                frameIndex: startIndex,
                startIndex: startIndex,
                endIndex: endIndex,
                row: row
            };
        }
    },
    getState: function (name) {
        if (this.states[name]) {
            return this.states[name];
        }
    }
};

State.generateState("right", 0, 6, 2);
State.generateState("left", 0, 6, 3);


function animate(state) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        character, state.frameIndex * frameWidth, srcY, frameWidth, frameHeight, xPos, yPos, frameWidth, frameHeight);


    srcY = state.row * frameHeight;

    count++;
    if (count > secondsToUpdate) {
        state.frameIndex++;
        count = 0;
    }

    if (state.frameIndex > state.endIndex) {
        state.frameIndex = state.startIndex;
    }
}




function keyboard(e) {
    if (e.keyCode == 68) {
a = true;


        requestAnimationFrame(function() {

            animate(State.getState("right"));
         });



        xPos += speed;

    }

    if (e.keyCode == 65) {
        a = true;

        requestAnimationFrame(function() {

            animate(State.getState("left"));
         });

        xPos -= speed;


    }



}



