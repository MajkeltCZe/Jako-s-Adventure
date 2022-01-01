const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const narrator = document.getElementById('narrator');
const options = document.getElementById('options');
document.addEventListener('keyup', keyboardPress);
document.addEventListener('keydown', keyboard);
const character = new Image();
var background = new Image();
character.src = './img/test.png';
background.src = './img/background0.jpg';

const frameWidth = 108;
const frameHeight = 140;

var xPos = 20;
var yPos = 280;
var speed = 10;
let frameIndex = 0;
let count = 0;
var timer;
var narration = 0;
let bg = 0;

let state = {};

background.onload = function () {
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(character, frameWidth, 4 * frameHeight, frameWidth, frameHeight, xPos, yPos, frameWidth, frameHeight);
}

//walking
function animate(startIndex, endIndex, row) {
    count++;
    if (count > 6) {

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
function keyboardPress(b) {

    if (b.keyCode == 39 || b.keyCode == 37) {


        timer = setInterval(interval, 50);

    }

}



function keyboard(e) {
    if (e.keyCode == 39) {


        requestAnimationFrame(function () {
            clearInterval(timer);

            animate(0, 6, 2);
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

            animate(0, 6, 3);
        });

        if (bg == 0 && xPos == 10) {
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






/* texty 
  
function startGame() {
        state = {};
        showTextNode(1);
      }


      function showTextNode(textNodeIndex) {
        const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
        textElement.innerText = textNode.text
        while (optionButtonsElement.firstChild) {
          optionButtonsElement.removeChild(optionButtonsElement.firstChild)
        }
      
        textNode.options.forEach(option => {
          if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
          }
        });
      }


function showOption () {
return option.requiredState == null || option.requiredState(state);

}
function selectOption(option) {
const NextTextNodeId = option.NextText;

state = Object.assign(state,option.setState);
showTextNode(NextTextNodeId);

}

const TextNode = [
    {
        id: 1,
text: 'Would you stop ??',
        options: [
            {
                text: 'Okay.',
              //  setState: { stupid = false },
                nextText: 2
            },
            {
                text: 'No.',
            }
        ]
    },
    {
        id: 2
    }
]


// requiredState: (currentState) => currentState.veryStupid
startGame();
*/