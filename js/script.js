const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const narrator = document.getElementById('narrator');
const options = document.getElementById('options');
const button = document.querySelectorAll('.button');
document.addEventListener('keyup', keyboardPress);
document.addEventListener('keydown', keyboard);
const character = new Image();
var background = new Image();
character.src = './img/test1.png';
background.src = './img/background0.jpg';
const play = document.getElementById('play');
const menu = document.getElementById('menu');
const game = document.getElementById('game');
const frameWidth = 108;
const frameHeight = 140;

var xPos = 20;
var yPos = 280;
var speed = 7;
let frameIndex = 0;
let count = 0;
var timer;
let bg = 0;

let state = {};



background.onload = function () {

    ctx.drawImage(background, 0, 0);
    ctx.drawImage(character, frameWidth, 4 * frameHeight, frameWidth, frameHeight, xPos, yPos, frameWidth, frameHeight);

}


play.addEventListener('click', () => {

    game.style.display = "initial";
    menu.style.display = "none";
    document.body.style.backgroundImage = "url('sdw')";
});



//walking
function animate(startIndex, endIndex, row) {
    count++;
    if (count > 3) {

        frameIndex++;
        count = 0;

    }

    if (frameIndex > endIndex) {
        frameIndex = startIndex;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(character, frameIndex * frameWidth, row * frameHeight, frameWidth, frameHeight, xPos, yPos, frameWidth, frameHeight);


}

function interval() {

    var timesRun = 0;
    timesRun += 1;
    if (timesRun === 1) {

        animate(0, 0, 4);

        clearInterval(timer);

    }
    animate(0, 0, 4);
}

console.log(playable);



    //keyboard
    function keyboardPress(b) {

        if (b.keyCode == 39 || b.keyCode == 37) {


            timer = setInterval(interval, 50);

        }

    }



    function keyboard(e) {
        if (e.keyCode == 39) {


            requestAnimationFrame(function () {
                clearInterval(timer);

                animate(0, 4, 2);
            });


            if (bg == 2 && xPos >= (canvas.width - 80)) {
                xPos = xPos;

            }
            else {
                xPos += speed;
            }
        }

        if (e.keyCode == 37) {

            requestAnimationFrame(function () {
                clearInterval(timer);

                animate(0, 4, 3);
            });

            if (bg == 0 && xPos <= 10) {
                xPos = xPos;

            }
            else {
                xPos -= speed;
            }
        }
        ChangeBackground();

    }



function ChangeBackground() {


    if (xPos >= canvas.width - 70) {
        bg++;
        background.src = './img/background' + bg + '.jpg';
        xPos = 1;

    }

    if (xPos <= 0) {
        bg--;
        background.src = './img/background' + bg + '.jpg';
        xPos = canvas.width - 70;

    }

}

//texty 


function Narration (number) {
    const textNode = texts.find(textNode => textNode.id === textNodeIndex)
narrator.innerHTML = textNode.text


}


/*

function Narration(textNodeIndex) {
    const textNode = texts.find(textNode => textNode.id === textNodeIndex)
    narrator.innerHTML = textNode.text


    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.addEventListener('click', () => selectOption(option))

        }
    });


}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText

    state = Object.assign(state, option.setState)
    Narration(nextTextNodeId);

}



//texty
const texts = [
    {
        id: 1,
        text: ` <p><strong class="narrator">Narrator:</strong> Welcome ! </p> <p>Press <strong>"A"</strong> to move left , press <strong>"D"</strong> to move right.</p>
        <p>Choose answer below by clicking on it:</p>`
        ,
        options: [
            {
                text: 'Hi',
                nextText: 2
            },
            {
                text: 'Ignore',
                setState: { Rude: true },

                nextText: 3
            }
        ]
    },

    {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant.',
        options: [
            {
                text: 'Trade the goo for a sword',
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text: 'Trade the goo for a shield',
                setState: { blueGoo: false, shield: true },
                nextText: 3
            }

        ]
    }


]


Narration(1);
*/