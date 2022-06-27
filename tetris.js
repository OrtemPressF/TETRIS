let canvas;
let context1;
let lastTime = 0;   
let GameOverMenu;
let restart;
var audio = new Audio('media/retrowave.mp3'); 
var sound = new Audio('media/whooshhh.mp3'); 
let dropCount = 0;
let dropTime = 1000;
let level = 1;
let continueG;

//let dropCount = 0;
//let dropTime = 1000;
// let hod = 0;
// function drawLine(context, x1, y1, x2, y2){ //code from git hub https://github.com/JaroslavE/VSCode
//     context.beginPath();
//     context.strokeStyle = "darkgrej";
//     context.moveTo(x1, y1);
//     context.lineTo(x2, y2);
//     context.closePath();
//     context.stroke();
// }                                       //end of code from git hub https://github.com/JaroslavE/VSCode

// window.onload = function(){               //   load functions after canvas and ect are created
 canvas = document.getElementById("canvas1");
 context1 = canvas.getContext("2d");
 GameOverMenu = document.getElementById("gayOver");
restart = document.getElementById("restart");
continueG = document.getElementById("continue");
buttonStop = document.getElementById("stop");
button = document.getElementById("music");
over = document.getElementById("over");
screamJpg = document.getElementById("scream");


function Play () {
    if (audio.paused) {
        audio.play();
        button.textContent = "Music OFF"
    }else{
        audio.pause();
        button.textContent = "Music ON"
    }
}


function createTetrominoes(type){
    if(type==='T'){
        //const tetroids = [                             //the 'T' tetrominoe;
          return[
           
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 0],
        ];
        }
        else if (type==='O'){
            return[
            [2, 2],
            [2, 2],
        ];
            }
            else if (type==='L'){
                return[
                    [3, 3, 3],
                    [0, 0, 3],
                    [0, 0, 0],
            ];
                }
                else if (type==='J'){
                    return[
                        [4, 4, 4],
                        [4, 0, 0],
                        [0, 0, 0],
                ];
                    }
                    else if (type==='I'){
                        return[
                            [0, 0, 0, 0],
                            [5, 5, 5, 5],
                            [0, 0, 0, 0],
                            [0, 0, 0, 0],
                        ];
                        }
                        else if (type==='S'){
                            return[
                                [0, 6, 6],
                                [6, 6, 0],
                                [0, 0, 0],
                                ];
                            }
                            else if (type==='Z'){
                                return[
                                    [7, 7, 0],
                                    [0, 7, 7],
                                    [0, 0, 0],
                                    ];
                                }
        }
context1.scale(35,35); 

function arenaSweep() {                                      //уточнить и исправить 
    let rowCount = 1;
    outer:for(let y = arena.length-1; y> 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
    }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
        sound.play();
        player.score = player.score + rowCount*10;
        if(player.score<10){
             dropCount = 0;
         dropTime = 1000;
        } else if(player.score>10&&(player.score<300)){
             dropCount = 0;
             level = 2;
 dropTime = 500;
    }else if(player.score>100&&(player.score<500)){
        dropCount = 0;
        level = 3;
dropTime = 450;
}else if(player.score>500&&(player.score<700)){
    dropCount = 0;
    level = 4;
dropTime = 400;
}
else if(player.score>700&&(player.score<1000)){
    dropCount = 0;
    level = 5;
dropTime = 300;
}
}
}
function drawn(tetroids, pos){                   //func to draw tetroids
    tetroids.forEach((row, y) =>{
        row.forEach((value, x)=>{
            if (value!==0){
                context1.fillStyle = colors[value   ];
                context1.fillRect (x+pos.x, y+pos.y, 1 ,1);          //it's position
            }
        });
    });
    }
function display(){                                                     //to draw tetroid on canvas 
context1.fillStyle ='rgb(33, 33, 33)';
context1.fillRect (0, 0, canvas.width, canvas.height); 
drawn(arena, {x:0,y:0});                                              //when tetroi> arena, we create the same on canvas
drawn(player.tetroids, player.pos);
}

function merge(arena, player){
    player.tetroids.forEach((row, y)=>{
    row.forEach((value, x)=>{
        if( value !== 0){
            arena[y + player.pos.y][x + player.pos.x]=value;
        }
    })
})
}

function playerRotate(dir){
    rotate(player.tetroids, dir);
        if(collide(arena, player)){
    }
}

function scoreUp(){
    document.getElementById('score').innerText = player.score;
}
function levelUp(){
    document.getElementById('level').innerText = player.level;
}

function rotate(tetroids, dir){
for(let y = 0; y<tetroids.length; y++){
    for(let x =0; x<y; x++){

        [
            tetroids[x][y],
            tetroids[y][x],
        ]=
        [
            tetroids[y][x],
            tetroids[x][y],
        ]
    }
}
if(dir>0){
    tetroids.forEach(row=>row.reverse());
}else tetroids.reverse();
}

function PlayerDrop() {
player.pos.y++;
  if(collide(arena,player)){
    player.pos.y--;
    player.pos.x == player.pos.x;
    merge(arena, player);
  resetTetrominoes();
  arenaSweep();
  player.pos.y=0;                                         //INCORRECT POSITION
  player.pos.x=3;
  scoreUp();
}
dropCount = 0;
}


function update(time = 0){
// console.log(time);
const deltaTime = time - lastTime;
lastTime = time;
dropCount += deltaTime;
if (dropCount> dropTime){
    PlayerDrop() 
    
  }

    display();
requestAnimationFrame(update);
}

//same 

function updateNULL(){                                             //to spawn tetr. on the bottom 
    PlayerDropNULL(); 
    display();
requestAnimationFrame(update);
}


function PlayerDropNULL(){
    if(collide(arena,player)==true){
        return;
    }
while(collide(arena,player)==false){
     player.pos.y++;
}
  if(collide(arena,player)){
    player.pos.y--;
    // player.pos.x == player.pos.x;
    merge(arena, player);
  resetTetrominoes();
  arenaSweep();
  scoreUp();
  player.pos.y=0;                                         //INCORRECT POSITION
    player.pos.x=3;
}
dropCount = 0;
}

function xMove(dir){
player.pos.x=player.pos.x +dir;
if(collide(arena, player)){
    player.pos.x =player.pos.x- dir;
}
}
function resetTetrominoes(){
    const tetrominoes = 
    // 'TJLOSZI';
    ['I', 'T', 'S', 'Z', 'J', 'L', 'O'];
    player.tetroids = createTetrominoes(tetrominoes[tetrominoes.length * Math.random()| 0]);
    player.pos.y=0;
    player.pos.x=4;
    if(collide(arena, player)){
        playerEnd();
        return;
    }
}
document.addEventListener('keydown', event =>{        //DOM?????
if(event.keyCode === 65){
    xMove(-1);
}
if(event.keyCode === 68){
    xMove(1);
}
if(event.keyCode === 83){
    PlayerDrop();
}
if(event.keyCode === 32){
    updateNULL();
}if(event.keyCode === 87){
    playerRotate();
}
})

function createMatrix(w, h) {
const tetroids = [];
while (h--) {
    tetroids.push(new Array(w).fill(0));
}
return tetroids;
}


function merge(arena, player){
player.tetroids.forEach((row, y)=>{
    row.forEach((value, x)=>{
        if( value !== 0){
        arena[y + player.pos.y][x + player.pos.x]=value;
        }
    })
})
}
function collide(arena,player) {
for (let y = 0; y < player.tetroids.length; ++y) {
    for (let x = 0; x < player.tetroids[y].length; ++x) {
        if (player.tetroids[y][x] !== 0 && (arena[y + player.pos.y] && arena[y + player.pos.y][x + player.pos.x]) !== 0) {
            return true;
        }
    }
}
return false;
}

const arena = createMatrix(10,20)

const colors = [
null,'rgb(230, 129, 79)','#fba09e','#367481','#d04a55','#4db4bf','#e8c5c8  ','#473f72',
]

const player = {                        
pos : {x : 3, y : 0},                //first tetr. position 
    tetroids:createTetrominoes('S'),
    score : 0,
    level : 1,
}

restart.addEventListener("click", restartGame);
// music.addEventListener("click", music.play());
continueG.addEventListener("click", continueGame);

    // function playMusic() {
    //     music.play();
    //   }
    //   function pauseMusic() {
    //     music.pause();
    //   }
    function displayMenu(menu){
        menu.style.visibility = "visible";
        over.style.visibility = "visible";
        continueG.style.visibility= "hidden"; 
        screamJpg.style.visibility= "visible"; 

    }
    function hideMenu(menu){
        menu.style.visibility = "hidden";
        over.style.visibility = "hidden";
        continueG.style.visibility= "hidden"; 
        screamJpg.style.visibility= "hidden"; 
    }

    function displayButt(menu){
        screamJpg.style.visibility= "hidden"; 
        menu.style.visibility = "visible";
        over.style.visibility = "hidden";
        continueG.style.visibility= "visible"; 
        dropTime = 100000;        
    }


 function playerEnd(gameOverMenu){
    //  arena.forEach(row=> row.fill(0));
    //  alert("GAME OVER");
displayMenu(GameOverMenu);
stop.textContent = "I begged u to stop.."
pictureChange();
 }
 
 function restartGame(){
    hideMenu(GameOverMenu);
     arena.forEach(row=> row.fill(0));
     player.score = 0;
     player.level = 1;
      dropTime = 1000;
     scoreUp();
 }
 function continueGame(){
    hideMenu(GameOverMenu);
    if(level==1){
        dropTime = 1000;
    } else if(level==2){
        dropTime = 500;
    } else if(level==3){
        dropTime = 450;
    }else if(level==3){
        dropTime = 400;
    }else if(level==4){
        dropTime = 300;
    }else if(level==5){
        dropTime = 200;
    }
     
 }
 function pictureChange()
 {
       document.getElementById("stop").src="media/93659586.jpg";
 }

 

    scoreUp();
    update();
    arenaSweep();