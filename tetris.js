let canvas;
let context1;
let lastTime = 0;
let GameOverMenu;
let restart;
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

// var x = canvas.width/2;
// var y = canvas.height/2;

// for(let i = 0;i<400;i+=35){
// drawLine(context1, i,0, i,700);
// }

// for(let j = 0;j<800;j+=35){
// drawLine(context1, 0,j, 350,j);
// }                                          // finish drawing lines



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
                    [0, 3, 0],
                    [0, 3, 0],
                    [0, 3, 3],
            ];
                }
                else if (type==='J'){
                    return[
                        [0, 4, 0],
                        [0, 4, 0],
                        [4, 4, 0],
                ];
                    }
                    else if (type==='I'){
                        return[
                            [0, 5, 0, 0],
                            [0, 5, 0, 0],
                            [0, 5, 0, 0],
                            [0, 5, 0, 0],
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
    outer:for(let y = arena.length-1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        // player.score += rowCount * 10;
        // rowCount *= 2;
    }
}

  function drawn(tetroids, pos){                   //func to draw tetroids (drawMatrix)
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
  context1.fillStyle = 'rgb(33, 33, 33)';
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


function PlayerDrop() {
   player.pos.y++;
      if(collide(arena,player)){
        player.pos.y--;
        player.pos.x == player.pos.x;
        merge(arena, player);
      resetTetrominoes();
      arenaSweep();
        //     player.pos.y=-2;
        player.pos.x=3;
    }
    dropCount = 0;
}


let dropCount = 0;
let dropTime = 1000;

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
   while(collide(arena,player)==false){ player.pos.y++;
   }
      if(collide(arena,player)){
        player.pos.y--;
        player.pos.x == player.pos.x;
        merge(arena, player);
      resetTetrominoes();
      arenaSweep();
        //     player.pos.y=-2;
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
function collide(arena, player) {
    const m = player.tetroids;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
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
        tetroids:createTetrominoes('T'),
    }
    restart.addEventListener("click", restartGame);

    
    function displayMenu(menu){
        menu.style.visibility = "visible";
    }
    function hideMenu(menu){
        menu.style.visibility = "hidden";
    }
 function playerEnd(gameOverMenu){
    //  arena.forEach(row=> row.fill(0));
    //  alert("GAME OVER");
displayMenu(GameOverMenu);
 }
 
 function restartGame(){
    hideMenu(GameOverMenu);
     arena.forEach(row=> row.fill(0));
 }
 

    update();
    arenaSweep();