const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const narrator = document.getElementById('narrator');
const options = document.getElementById('options');
const play = document.getElementById('play');
const frameWidth = 108;
const frameHeight = 140;
var xPos = 20;
var yPos = 280;
var speed = 10;
let frameIndex = 0;
let count = 0;
var timer,cutscene,playable;
let bg = 0;
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
  animate(3,0, 0, 4)
Narration(1);
});



function Narration(textIndex) {
    const textNode = texts.find(textNode => textNode.id === textIndex);
    narrator.innerHTML = textNode.text;
    while (options.firstChild) {
        options.removeChild(options.firstChild)
    }
    if (Object.keys(textNode.options).length === 0) playable = true;
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

    if (option.nextText == -1) {

        gameover();
    
    }
    Narration(nextTextNodeId);
    playable = true;


    state.push(state, option.state);


 Storytelling();
}


const texts = [
    {
        id: 1,
        text: '<p><strong class="narrator">Narrator:</strong> Welcome ! </p>  <p>Choose answer below by clicking on it:</p>'
        ,
        options: [
            {
                text: 'Hi',
                nextText: 2,
          state: "manners"
            },
            {
                text: 'Ignore',
                nextText: 3,
            state: "ignore"
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
                nextText: 5,
                state: "backstory"
            },
            {
                text: 'What, no.',
                nextText: 6
            }
        ]
    },
    {
        id: 5,
        text: '<p><strong class="narrator">Narrator:</strong> You are Jako and you just want to live your life, but you are also adventurous so here is your adventure! </p>'
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
                nextText: 8,
                state: "waving"
            },
            {
                text: 'Do nothing',
                nextText: -1,
            }
    ]
    },
   {
        id: 8,
        text: '<p><strong class="narrator">Narrator:</strong> You got a new friend !</p>'
        , options: [
        ]
    },
]

class Jako {

constructor() {
this.x = 20;
this.y = 280;
this.speed = 5;

}


 keyboard(e) {
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




}






function animate(i,startIndex, endIndex, row) {
    count++;
    if (count > 3) {

        frameIndex++;
        count = 0;

    }

    if (frameIndex > endIndex) {
        frameIndex = startIndex;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  //  ctx.drawImage(background, 0, 0);
    ctx.drawImage(img[i], frameIndex * frameWidth, row * frameHeight, frameWidth, frameHeight, xPos, yPos, frameWidth, frameHeight);


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



function keyboardPressed(e) {




    if (e.keyCode == 39 || e.keyCode == 37) {


        timer = setInterval(interval, 50);

    }

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

    if (bg == 1 && story == 2) {
        story++;

        Narration(7);
    }



    if (state.includes('backstory') && story == 2) {
        setInterval(() => {
            animate();
        }, 150);

    }











}



function gameover() {

    canvas.style.display = "none";
    document.body.innerHTML = '<h2 class="text-center end mb-5"> THE END OF YOUR JOURNEY</h2> <p class="text-center end mt-5"> You died.</p>';
    document.body.style.backgroundImage = "url(./img/background3.jpg)";

}



cutscene = setInterval(() => {
    animate(4,0,4,4);
}, 150);
   