const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const narrator = document.getElementById('narrator');
const options = document.getElementById('options');
const character = new Image();
var background = new Image();
const waveyMan = new Image();
character.src = './img/test1.png';
waveyMan.src = './img/waveman.png'
background.src = './img/background0.jpg';
const play = document.getElementById('play');
const game = document.getElementById('game');
const frameWidth = 108;
const frameHeight = 140;

var xPos = 20;
var yPos = 280;
var speed = 6;
let frameIndex = 0;
let count = 0;
var timer;
let bg = 0;
let playable;
let story = 1;




play.addEventListener('click', () => {

    game.style.display = "initial";
    play.style.display = "none";
    document.body.style.backgroundImage = "url(./img/backgrounds.jpg)";

    ctx.drawImage(background, 0, 0);
    ctx.drawImage(character, frameWidth, 4 * frameHeight, frameWidth, frameHeight, xPos, yPos, frameWidth, frameHeight);
    Narration(1);

});


//narration
// ----------------------------------------------------------------------------------------// 

function Narration(textIndex) {
    const textNode = texts.find(textNode => textNode.id === textIndex);
    narrator.innerHTML = textNode.text;

    while (options.firstChild) {
        options.removeChild(options.firstChild)
    }

    if (Object.keys(textNode.options).length === 0) {

        playable = true;
    }

    else {
        playable = false;
    }


    textNode.options.forEach(option => {
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn');
        button.addEventListener('click', () => selectOption(option))
        options.appendChild(button);

    });
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    Narration(nextTextNodeId);
    playable = true;

}


const texts = [
    {
        id: 1,
        text: '<p><strong class="narrator">Narrator:</strong> Welcome ! </p>  <p>Choose answer below by clicking on it:</p>'
        ,
        options: [
            {
                text: 'Hi',
                nextText: 2
            },
            {
                text: 'Ignore',
                nextText: 3
            }
        ]
    },

    {
        id: 2,
        text: ' <p><strong class="narrator">Narrator:</strong> Press <strong>"A"</strong> to move left! Press <strong>"D"</strong> to move right!</p>',
        options: [


        ]
    },

    {
        id: 3,
        text: '<p><strong class="narrator">Narrator:</strong> Rude...Figure how to move yourself. </p>'
        , options: [
        ]

    },

    {
        id: 4,
        text: '<p><strong class="narrator">Narrator:</strong> Do you wanna hear your backstory ? </p>'
        , options: [
        
            {
                text: 'Yes',
                nextText: 5
            },
            {
                text: 'What, no.',
                nextText: 6
            }
        
        ]

    },

    {
        id: 5,
        text: '<p><strong class="narrator">Narrator:</strong> You are Jako and you just wanted to live your life, but you are also adventurous so here is your adventure! </p>'
        , options: []

    },


    {
        id: 6,
        text: '<p><strong class="narrator">Narrator:</strong> .... </p>'
        , options: []

    },


    {
        id: 7,
        text: '<p><strong class="narrator">Narrator:</strong> You meet a person. What will you do ? </p>'
        , options: [
            
            {
                text: 'Wave at him',
                nextText: 8
            },
            {
                text: 'Do nothing',
                nextText: 9
            }




        ]

    },








]











//animation
// ----------------------------------------------------------------------------------------// 
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



//keyboard
// ----------------------------------------------------------------------------------------// 
document.addEventListener('keyup', keyboardPressed);
document.addEventListener('keydown', keyboard);


function keyboardPressed(e) {

    if (e.keyCode == 39 || e.keyCode == 37) {


        timer = setInterval(interval, 50);

    }

}

function keyboard(e) {
    if (e.keyCode == 39) {

        if (playable == true) {
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
    }

    if (e.keyCode == 37) {
        if (playable == true) {
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
    }
    ChangeBackground();
Storytelling();

}

//background Change
// ----------------------------------------------------------------------------------------// 

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


function Storytelling() {


if (bg == 0 && story == 1 && xPos >= 400) {
story++;
    Narration(4);

}

if (bg ==1 && story == 2) {
story++;

Narration(7);
}


}





