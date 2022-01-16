const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const narrator = document.getElementById('narrator');
const options = document.getElementById('options');
const play = document.getElementById('play');
const footer = document.getElementById('footer');
const language = document.getElementById('language');
const menu = document.getElementById('menu');
const right = document.getElementById('right');
const left = document.getElementById('left');

let media = window.matchMedia("(max-width: 600px)");
const frameWidth = 108, frameHeight = 140;
let frameIndex = 0, count = 0, bg = 0, l = 'en', moving = 0;
let cutscene, playable = true, story = 1, timing, active = false;
let state = [];
let img = [];

for (let i = 0; i < 6; i++) {
    img[i] = new Image;
    img[i].src = './img/' + i + '.png';

}

class char {
    constructor(img, xPos, yPos, start, end, row, move) {
        this.x = xPos;
        this.y = yPos;
        this.src = img;
        this.s = start;
        this.e = end;
        this.row = row;
        this.move = move;
    }

    animace(speedy, time) {
        active = true;
        let now = new Date().getTime();
        let interval = setInterval(() => {
            animate(this.src, this.x, this.y, this.s, this.e, this.row);
            this.x += this.move;
            controls.style.display = "none";
            playable = false;
            if (new Date().getTime() - now > time) {
                clearInterval(interval);
                active = false;
                story++;
                Storytelling();
            }
        }, speedy);
    }
}

//mobile controls
//------------------------------------------------//
right.addEventListener('pointerdown', () => {
    moving = setInterval(() => {
        moveRight();
        ChangeBackground();
        Storytelling();
    }, 30);

});

left.addEventListener('pointerdown', () => {
    if (state.includes('boom')) {
        moving = setInterval(() => {
            shift();
            ChangeBackground();
            Storytelling();
        }, 30);
    }
else {
    moving = setInterval(() => {
        moveLeft();
        ChangeBackground();
        Storytelling();
    }, 30);

}

});

right.addEventListener('pointerup', () => {
    clearInterval(moving);
    stopMoving();
});

left.addEventListener('pointerup', () => {
    clearInterval(moving);
    stopMoving();
});
//------------------------------------------------//

const Jako = {
    x: 20,
    y: 280,
    speed: 5,
    img: 5,
    keyboardPressed: function (e) {
        if ((e.keyCode == 39 || e.keyCode == 37 || e.keyCode == 16)) {
            if (active == false) {
                stopMoving();
            }
        }
    },

    keyboard: function (e) {
        if (e.keyCode == 39 && playable == true) moveRight();
        if (e.keyCode == 37 && playable == true) moveLeft();
        if (e.keyCode == 16 && playable == true) shift();
        if (active == false) {
            ChangeBackground();
            Storytelling();
        }
    }
}

document.addEventListener('keydown', Jako.keyboard);
document.addEventListener('keyup', Jako.keyboardPressed);

//character moving functions
//------------------------------------------------//
function moveRight() {
    requestAnimationFrame(function () {
        animate(Jako.img, Jako.x, Jako.y, 0, 4, 2);
    });
    (bg == 2 && Jako.x >= (canvas.width - 80)) ? Jako.x = Jako.x : Jako.x += Jako.speed;
}

function moveLeft() {
    requestAnimationFrame(function () {
        animate(Jako.img, Jako.x, Jako.y, 0, 4, 3);
    });
    (bg == 0 && Jako.x <= 10) ? Jako.x = Jako.x : Jako.x -= Jako.speed;
}

function stopMoving() {
    requestAnimationFrame(function () {
        animate(Jako.img, Jako.x, Jako.y, 0, 0, 4);
    });

}

function shift() {
    requestAnimationFrame(function () {
        animate(Jako.img, Jako.x, Jako.y, 0, 7, 1);
    });
    (bg == 0 && Jako.x <= 10) ? Jako.x = Jako.x : Jako.x -= (Jako.speed * 2);
}
//------------------------------------------------//


function Narration(textIndex) {
    const textNode = texts.find(textNode => textNode.id === textIndex);
    (l == 'en') ? narrator.innerHTML = textNode.text : narrator.innerHTML = textNode.textcs;
    while (options.firstChild) {
        options.removeChild(options.firstChild)
    }
    if (Object.keys(textNode.options).length === 0) {
        playable = true;
        if (media.matches) controls.style.display = "block";
    }
    else {
        playable = false;
        controls.style.display = "none";
        clearInterval(moving);
        stopMoving();
    }
    textNode.options.forEach(option => {
        const button = document.createElement('button');
        if (l == 'en') {
            button.innerText = option.text;
        }
        else {
            button.innerText = option.textcs;
        }
        button.classList.add('btn');
        button.addEventListener('click', () => selectOption(option))
        options.appendChild(button);

    });
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    state.push(state, option.state);
    Storytelling();
    if (option.nextText != -1) {
        Narration(nextTextNodeId);
        playable = true;
    }
}
//all texts 
//------------------------------------------------//
const texts = [
    {
        id: 1,
        text: '<p><strong class="narrator">Narrator:</strong> Welcome ! </p>  <p>Choose answer below by clicking on it:</p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Vítej ! </p>  <p>Vyber odpověď kliknutím. </p>',
        options: [
            {
                text: 'Hi',
                textcs: 'Ahoj',
                nextText: 2,
            },
            {
                text: 'Ignore',
                textcs: 'Ignorovat',
                nextText: 3,
            }
        ]
    },
    {
        id: 2,
        text: ' <p><strong class="narrator">Narrator:</strong> Press <strong>"Left Arrow"</strong> to move left! Press <strong>"Right Arrow"</strong> to move right!</p>',
        textcs: ' <p><strong class="narrator">Vypravěč:</strong> Zmáčkni <strong>"Levou šipku"</strong> k pohybu do leva! Zmáčkni <strong>"pravou šipku"</strong> k pohybu do prava!</p>',
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
            },
            {
                text: 'What, no.',
                textcs: 'Ehm, ne.',
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
                state: "killed"
            }
        ]
    },
    {
        id: 8,
        text: '<p><strong class="narrator">Narrator:</strong> He is bit freak out by you but I think you will be okay.</p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Trošku si ho vystrašil, ale myslím že budeš v pořádku.</p>'
        , options: [
        ]
    },
    {
        id: 9,
        text: '<p><strong class="narrator">Narrator:</strong> YOU DIED. I guess Jako won&#39;t be the great adventurer. Pablo killed him. Some people have serious anger issues.</p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> ZEMŘELS. Asi Jako nebude velký dobrodruh. Pablo ho zabil. Někteří lidé mají vážné problémy se vztekem.</p>'
        , options: [
        ]
    },
    {
        id: 10,
        text: '<p><strong class="pablo">Pablo:</strong> Hi, are you my new friend ? </p>',
        textcs: '<p><strong class="pablo">Pablo:</strong> Zdravím, jsi můj nový kamarád ?</p>'
        , options: [
            {
                text: 'Sure',
                textcs: 'Jo',
                nextText: 11,
                state: "friends"
            },
            {
                text: 'No',
                textcs: 'Ne',
                nextText: 12,
            }
        ]
    },
    {
        id: 11,
        text: '<p><strong class="pablo">Pablo:</strong> Great ! Btw, you will find something if you go to the right.</p>',
        textcs: '<p><strong class="pablo">Pablo:</strong> Super ! Mimochodom, když půjdeš do prava asi tam něco najdeš.</p>'
        , options: [
        ]
    },
    {
        id: 12,
        text: '<p><strong class="pablo">Pablo:</strong> Oh....</p>',
        textcs: '<p><strong class="pablo">Pablo:</strong> Oh....</p>'
        , options: [
        ]
    },
    {
        id: 13,
        text: '<p><strong class="narrator">Narrator:</strong> What is that ? </p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Co to je ? </p>'
        , options: [
            {
                text: 'Touch it',
                textcs: 'Dotknout se',
                nextText: 14,
                state: "boom"
            },
            {
                text: 'Do nothing',
                textcs: 'Nic nedělat',
                nextText: 15,
            }
        ]
    },
    {
        id: 14,
        text: '<p><strong class="narrator">Narrator:</strong> It is a bomb ! RUN ! use <strong>"shift"</strong>! </p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> To je bomba ! UTÍKEJ ! použíj <strong>"shift"</strong>! </p>'
        , options: [
        ]
    },
    {
        id: 15,
        text: '<p><strong class="narrator">Narrator:</strong> Maybe you should ask Pablo about it.</p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Možná se můžeš zkusit zeptat Pabla, možná o tom něco ví. </p>'
        , options: [
        ]
    },
    {
        id: 16,
        text: '<p><strong class="pablo">Pablo:</strong> You found something there ? Oh shoot, I hoped they would left some diamonds but it is just a bomb. It is good you did not touch it. Do you want to defuse it ?</p>',
        textcs: '<p><strong class="pablo">Pablo:</strong> Něcos našel ? Oh kruci, doufal jsem, že by tam nechali diamanty, ale je to jen bomba. Aspoň jsi na to nesáhl. Chceš ji zneškodnit ?</p>'
        , options: [
            {
                text: 'I can try',
                textcs: 'Můžu to zkusit',
                nextText: 19,
                state: "defuser"
            },
            {
                text: 'Rather not',
                textcs: 'Radši ne',
                nextText: 26,
            }
        ]
    },
    {
        id: 17,
        text: '<p><strong class="pablo">Pablo:</strong> I am not helping you....</p>',
        textcs: '<p><strong class="pablo">Pablo:</strong> Moji pomoc nečekej... </p>'
        , options: []
    },
    {
        id: 18,
        text: '<p><strong class="narrator">Narrator:</strong> YOU DIED, because you can not run fast enough.</p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> ZEMŘELS, protože neumíš běhat rychle. </p>'
        , options: []
    },
    {
        id: 19,
        text: '<p><strong class="pablo">Pablo:</strong> Okay here is how: orange,white,pink. Good luck !</p>',
        textcs: '<p><strong class="pablo">Pablo:</strong> Dobře tady je návod: Oranžová, bílá, růžová. Hodně štěstí ! </p>'
        , options: []
    },
    {
        id: 20,
        text: '<p><strong class="narrator">Narrator:</strong> Start defusing the bomb ? </p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Zneškodnit bombu ? </p>'
        , options: [
            {
                text: 'Yes',
                textcs: 'Ano',
                nextText: 21,
            },
            {
                text: 'No',
                textcs: 'Ne',
                nextText: -1,
                state: "mindblowing"
            }
        ]
    },
    {
        id: 21,
        text: '<p><strong class="narrator">Narrator:</strong> Which wire are you cutting ?</p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Který drát přestřihneš ? </p>'
        , options: [
            {
                text: 'Orange',
                textcs: 'Oranžový',
                nextText: 22,
            },
            {
                text: 'Purple',
                textcs: 'Fialová',
                nextText: -1,
                state: "colordead"
            }
        ]
    },
    {
        id: 22,
        text: '<p><strong class="narrator">Narrator:</strong> Which wire are you cutting ? </p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Který drát přestřihneš ? </p>'
        , options: [
            {
                text: 'Blue',
                textcs: 'Modrý',
                nextText: -1,
                state: "colordead"
            },
            {
                text: 'White',
                textcs: 'Bílý',
                nextText: 23,
            }
        ]
    },
    {
        id: 23,
        text: '<p><strong class="narrator">Narrator:</strong> Which wire are you cutting ? </p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Který drát přestřihneš ? </p>'
        , options: [
            {
                text: 'Orange',
                textcs: 'Oranžový',
                nextText: -1,
                state: "colordead"
            },
            {
                text: 'Pink',
                textcs: 'Růžový',
                nextText: -1,
                state: "win"
            }
        ]
    },
    {
        id: 24,
        text: '<p><strong class="narrator">Narrator:</strong> YOU WON. You defused the bomb and now you are safe and ready for more future adventures ! </p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> VYHRÁVÁŠ. Zneškodnil jsi bombu a teď už jsi v bezpečí a připraven pro další budoucí dobrodružství ! </p>'
        , options: [
        ]
    },
    {
        id: 25,
        text: '<p><strong class="narrator">Narrator:</strong> YOU DIED. You are no good with colors or bombs.  </p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> ZEMŘELS. Nejsi dobrý v barvách ani to neumíš s bombami. </p>'
        , options: [
        ]
    },
    {
        id: 26,
        text: '<p><strong class="pablo">Pablo:</strong> Oh okay. Do you want to go with me to adventure ?</p>',
        textcs: '<p><strong class="pablo">Pablo:</strong>  No dobře. A chceš jít za dobrodružstvím se mnou ?</p>'
        , options: [
            {
                text: 'Yes',
                textcs: 'Ano',
                nextText: -1,
                state: "friendsforlife"
            },
            {
                text: 'Nah',
                textcs: 'Ne',
                nextText: -1,
                state: "neutral"
            }
        ]
    },
    {
        id: 27,
        text: '<p><strong class="narrator">Narrator:</strong> YOU WON. You are going to adventure with Pablo, even though the bomb is still there. </p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> VYHRÁVÁŠ. Vydáváš se s Pablem na další dobrodružství, ikdyž ta bomba tam stále je. </p>'
        , options: [
        ]
    },
    {
        id: 28,
        text: '<p><strong class="narrator">Narrator:</strong> YOU WON? You end up alone and with no heroic arc. </p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> VYHRÁVÁŠ? Skončils sám a se žádným hrdinským skutkem. </p>'
        , options: [
        ]
    },
    {
        id: 29,
        text: '<p><strong class="pablo">Pablo:</strong> Are you okay ? We should check it out. </p>',
        textcs: '<p><strong class="pablo">Pablo:</strong> Jsi v pořádku ? Mohli bychom se tam podívat, jak to tam vypadá.</p>'
        , options: [
            {
                text: 'You should go',
                textcs: 'Měl bys jít ty',
                nextText: 32,
                state: "coward"
            },
            {
                text: 'I will go',
                textcs: 'Já půjdu',
                nextText: 33,
                state: "brave"
            }
        ]
    },
    {
        id: 30,
        text: '<p><strong class="narrator">Narrator:</strong> YOU DIED. When you try not to defuse bomb you accidentally blow yourself up.</p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> ZEMŘELS. Když se pokoušel o to bombu nezneškodnit omylem ses vyhodil do vzduchu.</p>'
        , options: [
        ]
    },

    {
        id: 31,
        text: '<p><strong class="pablo">Pablo:</strong> Karma... </p>',
        textcs: '<p><strong class="pablo">Pablo:</strong> Karma..</p>'
        , options: [
        ]
    },
    {
        id: 32,
        text: '<p><strong class="pablo">Pablo:</strong> Okay, I will go. </p>',
        textcs: '<p><strong class="pablo">Pablo:</strong> Dobrá, tak já tedy půjdu.</p>'
        , options: [
        ]
    },
    {
        id: 33,
        text: '<p><strong class="pablo">Pablo:</strong> Good luck, my friend. </p>',
        textcs: '<p><strong class="pablo">Pablo:</strong> Hodně štěstí, můj příteli.</p>'
        , options: [
        ]
    },

    {
        id: 34,
        text: '<p><strong class="narrator">Narrator:</strong> Go check on Pablo.</p>',
        textcs: '<p><strong class="narrator">Narrator:</strong> Běž ho tam radši zkontrolovat. </p>'
        , options: [
        ]
    },
    {
        id: 35,
        text: '<p><strong class="pablo">Pablo:</strong>. Help me ! Something fell on me and I cannot move.</p>',
        textcs: '<p><strong class="pablo">Pablo:</strong> Pomoc mi ! Něco na mě spadlo a neumím se hýbat. </p>'
        , options: [
            {
                text: 'Help Pablo',
                textcs: 'Pomoc Pablovi',
                nextText: -1,
                state: "helper"
            },
            {
                text: 'Leave him there',
                textcs: 'Nechat ho tam',
                nextText: -1,
                state: "loner"
            }

        ]
    },
    {
        id: 36,
        text: '<p><strong class="narrator">Narrator:</strong> YOU SURVIVED. You helped Pablo to safety. He is greatful.</p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> PŘEŽILS. Pomohl jsi Pablovi do bezpečí. Je ti za to vděčný.</p>'
        , options: [
        ]
    },
    {
        id: 37,
        text: '<p><strong class="narrator">Narrator:</strong> YOU SURVIVED. You left Pablo for dead, but you survived.</p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> PŘEŽILS. Nechal jsi Pabla na pospas, ale přežil jsi.</p>'
        , options: [
        ]
    },

    {
        id: 38,
        text: '<p><strong class="narrator">Narrator:</strong> YOU SURVIVED. Something hit your head but Pablo helped you to safety.</p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> PŘEŽILS. Sice tě něco trefilo do hlavy, ale Pablo ti pomohl.</p>'
        , options: [
        ]
    },
    {
        id: 39,
        text: '<p><strong class="narrator">Narrator:</strong> YOU DIED. Something hit your head and no one come to rescue you.</p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> ZEMŘELS. Něco tě trefilo do hlavy a nikdo ti nepřišel na pomoc.</p>'
        , options: [
        ]
    },
    {
        id: 40,
        text: '<p><strong class="narrator">Narrator:</strong> Go back and have a look what happend there.</p>',
        textcs: '<p><strong class="narrator">Vypravěč:</strong> Běž to tam radši zkontrolovat. </p>'
        , options: [
        ]
    },
]
//------------------------------------------------//

//changes of story
//------------------------------------------------//
function Storytelling() {
    console.log(story);
    if (bg == 0 && story == 1 && Jako.x >= 450) {
        story++;
        Narration(4);
    }
    if (bg == 1 && !state.includes('coward')) {
        character = new char(4, 450, 280, 0, 0, 0, 0);
    }

    if (bg == 1 && story == 2 && Jako.x - character.x >= -150) {
        story++;
        Narration(7);
    }
    if (state.includes('waving') && story == 3) {
        cutscene = new char(Jako.img, Jako.x, Jako.y, 1, 5, 4, 0);
        cutscene.animace(100, 2400);
    }
    if (story == 4) {
        Narration(10);
        story++;
    }
    if (bg == 2) {
        character = new char(4, 850, 280, 0, 0, 2, 0);
    }
    if (story == 5 && bg == 2 && Jako.x >= 650) {
        Narration(13);
        story++;
    }
    //touching bomb
    if (story == 6 && bg == 2 && state.includes('boom')) {
        
        story++;
        left.innerHTML = 'shift';
        timing = setTimeout(() => {
            gameover(18);
        }, 5000);
       
        
    }
    if (story == 8 && bg == 1 && state.includes('boom')) {
        left.innerHTML = '<i class="fa fa-arrow-left" aria-hidden="true">';
        clearTimeout(timing);
        
    }
    if (story == 8 && state.includes('boom') && bg == 1) {
        if (state.includes('friends') && Jako.x <= 650) {
            Narration(29);
            story++;
        }
        if (Jako.x <= 800 && !state.includes('friends')) {
            Narration(31);
        }
       
        if (Jako.x <= 400 && !state.includes('friends')) {
            state.push('explorer');
            Narration(40);
            story++;
        }
    }
    if (story == 9 && (state.includes('brave') || state.includes('explorer')) && (bg == 2 || bg == 3)) {
        bg = 3;
    }

    if (story == 9 && state.includes('coward')) {
        character = new char(Jako.img, Jako.x, Jako.y, 0, 0, 4, 0);
        cutscene = new char(4, 450, 275, 0, 4, 1, 5);
        cutscene.animace(30, 3950);
    }

    if (story == 10 && state.includes('coward') && bg == 1) {
        character = new char(4, 0, 0, 0, 0, 4, 0);
        Narration(34);
        story++;
    }

    if (story == 11 && state.includes('coward') && (bg == 2 || bg == 3)) {
        bg = 3;
        character = new char(4, 220, 280, 0, 0, 3, 0);
        Narration(35);
        story++;
    }
    //-------------
    if (story == 6 && bg == 1 && Jako.x <= 650) {
        state.includes('friends') ? Narration(16) : Narration(17);
        story++;
    }


    if (story == 7 && bg == 2 & Jako.x >= 650) {
        Narration(20);
        story++;
    }

    // most endings
    if (state.includes('killed')) gameover(9, 2);
    if (state.includes('win')) gameover(24, 1);
    if (state.includes('colordead')) gameover(25, 2);
    if (state.includes('friendsforlife')) gameover(27, 1);
    if (state.includes('neutral')) gameover(28, 3);
    if (state.includes('mindblowing')) gameover(30, 2);
    if (state.includes('helper')) gameover(36, 3);
    if (state.includes('loner')) gameover(37, 3);
    if (story == 9 && (state.includes('brave') || state.includes('explorer')) && bg == 3 && Jako.x >= 400)
        state.includes('friends') ? gameover(38, 1) : gameover(39, 2);

}
//------------------------------------------------//


//function for animating frames and drawing them on canvas
//------------------------------------------------//
function animate(i, xPos, yPos, startIndex, endIndex, row) {
    count++;
    if (count > 3) {
        frameIndex++;
        count = 0;
    }
    if (frameIndex > endIndex) {
        frameIndex = startIndex;
    }
    ctx.clearRect(xPos, yPos, frameWidth, frameHeight);
    ctx.drawImage(img[bg], 0, 0);
    ctx.drawImage(img[i], frameIndex * frameWidth, row * frameHeight, frameWidth, frameHeight, xPos, yPos, frameWidth, frameHeight);

    // standing character
    if (bg != 0) {
        ctx.drawImage(img[character.src], 0, character.row * frameHeight, frameWidth, frameHeight, character.x, character.y, frameWidth, frameHeight);
    }

}
//------------------------------------------------//

//changing background
//------------------------------------------------//
function ChangeBackground() {
    if (Jako.x >= canvas.width - 70) {
        bg++;
        Jako.x = 1;
    }
    if (Jako.x <= 0) {
        bg--;
        Jako.x = canvas.width - 70;
    }
}
//the end of the game 
//------------------------------------------------//
function gameover(narration, picture) {
    Narration(narration);
    footer.style.display = "block";
    menu.style.display = "none";
    canvas.style.display = "none";
    controls.style.display = "none";
    if (picture == 1) {
        document.body.style.backgroundImage = "url(./img/background1.jpg)"
    }
    if (picture == 2) {
        document.body.style.backgroundImage = "url(./img/background2.jpg)"
    }
    else {
        document.body.style.backgroundImage = "url(./img/background3.jpg)"
    }
}
//------------------------------------------------//

//set language
//------------------------------------------------//
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
//------------------------------------------------//

//start of the game
//------------------------------------------------//
play.addEventListener('click', () => {
    narrator.style.display = "block";
    menu.style.display = "none";
    document.body.style.backgroundImage = "url(./img/backgrounds.jpg)";
    animate(Jako.img, Jako.x, Jako.y, 0, 0, 4);
    Narration(1);
});


