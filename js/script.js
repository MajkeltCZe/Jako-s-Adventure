const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const narrator = document.getElementById('narrator');
const options = document.getElementById('options');
const play = document.getElementById('play');
const language = document.getElementById('language');
const menu = document.getElementById('menu');
const frameWidth = 108, frameHeight = 140;
let frameIndex = 0, count = 0, bg = 0, l = 'en';
let cutscene,playable = true, story = 1;
let state = [];
let img = [];


for (let i = 0; i < 6; i++) {
    img[i] = new Image;
    img[i].src = './img/' + i + '.png';

}


play.addEventListener('click', () => {
    narrator.style.display = "block";
    menu.style.display = "none";
       
    document.body.style.backgroundImage = "url(./img/backgrounds.jpg)";
  animate(Jako.img,Jako.x,Jako.y,0, 0, 4);
  Narration(1);
});

language.addEventListener('click', () => {
if (l == 'en') {
    play.innerText = 'HRÁT';
   language.innerText = 'english';
    
    l = 'cs';
}


else {
    play.innerText = 'PLAY';
    language.innerText = 'česky';
  
 l = 'en'; 

}
});




class char {
constructor (img,xPos,yPos,start,end,row) {
this.x = xPos;
this.y = yPos;
this.src = img;
this.s = start;
this.e = end;
this.row = row;
}

animace() {

setInterval(() => {
   animate(this.src,this.x,this.y,this.s, this.e, this.row) ;
}, 50);


}

}



const Jako = {
x:20,
y: 280,
speed: 5,
img: 5,
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
    Storytelling();

}
}
document.addEventListener('keydown', Jako.keyboard);
document.addEventListener('keyup', Jako.keyboardPressed);



function Narration(textIndex) {
    const textNode = texts.find(textNode => textNode.id === textIndex);
   (l == 'en') ? narrator.innerHTML = textNode.text  : narrator.innerHTML = textNode.textcs;
  
    while (options.firstChild) {
        options.removeChild(options.firstChild)
    }
     (Object.keys(textNode.options).length === 0) ? playable = true :  playable = false;
    
       
    

    textNode.options.forEach(option => {
        const button = document.createElement('button')
       if  (l == 'en') { button.innerText = option.text; 
    } 
   else { button.innerText = option.textcs;  
   }
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
   else { Narration(nextTextNodeId);
    playable = true;

   }
    state.push(state, option.state);


 Storytelling();
}


const texts = [
    {
        id: 1,
        text: '<p><strong class="narrator">Narrator:</strong> Welcome ! </p>  <p>Choose answer below by clicking on it:</p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Vítej ! </p>  <p>Vyber odpověď kliknutím. </p>'
        ,
        options: [
            {
                text: 'Hi',
                textcs: 'Ahoj',
                nextText: 2,
          state: "manners"
            },
            {
                text: 'Ignore',
                textcs: 'Ignorovat',
                nextText: 3,
            state: "ignore"
            }
        ]
    },
    {
        id: 2,
        text: ' <p><strong class="narrator">Narrator:</strong> Press <strong>"A"</strong> to move left! Press <strong>"D"</strong> to move right!</p>',
        textcs: ' <p><strong class="narrator">Vypravěč:</strong> Zmačkni <strong>"A"</strong> k pohybu do leva! Zmáčkni <strong>"D"</strong> k pohybu do prava!</p>',
        options: [
        ]
    },
    {
        id: 3,
        text: '<p><strong class="narrator">Narrator:</strong> Rude...Figure how to move yourself. </p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Neslušňáku...zjisti si pohybování sám.. </p>'
        , options: [
        ]

    },

    {
        id: 4,
        text: '<p><strong class="narrator">Narrator:</strong> Do you wanna hear your backstory ? </p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Chceš si poslechnout svůj příběh? </p>'
        , options: [
            {
                text: 'Yes',
                textcs: 'Ano',
                nextText: 5,
                state: "backstory"
            },
            {
                text: 'What, no.',
                textcs: 'Em, ne.',
                nextText: 6
            }
        ]
    },
    {
        id: 5,
        text: '<p><strong class="narrator">Narrator:</strong> You are Jako and you just want to live your life, but you are also adventurous so here is your adventure! </p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Jmenuješ se Jako a prostě sis chtěl žít svůj život, ale taky máš rád dobrodružství takže tady ho máš ! </p>'
        , options: []

    },
    {
        id: 6,
        text: '<p><strong class="narrator">Narrator:</strong> .... </p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> ..... </p>'
        , options: []

    },
    {
        id: 7,
        text: '<p><strong class="narrator">Narrator:</strong> You meet a person. What will you do ? </p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Potkáš člověka. Co uděláš ? </p>'
        , options: [
            
            {
                text: 'Wave at him',
                textcs: 'Zamávat na něj',
                nextText: 8,
                state: "waving"
            },
            {
                text: 'Do nothing',
                textcs: 'Nic nedělat',
                nextText: -1,
            }
    ]
    },
   {
        id: 8,
        text: '<p><strong class="narrator">Narrator:</strong> You got a new friend !</p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Máš nového kamaráda !</p>'
        , options: [
        ]
    },

    {
        id: 9,
        text: '<p><strong class="narrator">Narrator:</strong> You died. I guess Jako won&#38;t be the great adventurer.</p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Zemřel jsi. Asi Jako nebude velký dobrodruh.</p>'
        , options: [
        ]
    },
]


function Storytelling() {


    if (bg == 0 && story == 1 && Jako.x >= 400) {
        story++;
        Narration(4);

    }

    if (bg == 1 && story == 2) {
        story++;

        Narration(7);
    }

    if (bg == 1) {
        character = new char(4,450,280,0,5,0);
     
     
     }

    if (state.includes('waving') && story == 3) {
        character = (4,450,280,0,5,0);
        cutscene = new char(4,450,280,0,5,0);
        cutscene.animace();

    }

  



    

}



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


 
if (bg == 1) {
       ctx.drawImage(img[character.src],0,character.s, frameWidth, frameHeight,character.x,character.y,frameWidth, frameHeight);
}
        

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





function gameover() {
    Narration(9);
    menu.style.display = "none";

    document.body.style.backgroundImage = "url(./img/background3.jpg)";

    cutscene = new char (5,250,280,0,8,0);
       cutscene.animace();
   

}






