/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var boardwidth = 60;
var boardheight = 60;
var gameOn = false;
var board = [];

ctx.font = "30px Arial";

var neededNeighbors = document.createElement("INPUT");
neededNeighbors.setAttribute("type", "text");

var startBtn = document.createElement("button");
startBtn.innerHTML = "Start/Stop";

var randomizeBtn = document.createElement("button");
randomizeBtn.innerHTML = "Randomize"
neededNeighbors.size = 20
document.body.appendChild(neededNeighbors);
document.body.appendChild(startBtn);
document.body.appendChild(randomizeBtn);

neededNeighbors.defaultValue = 3;

neededNeighbors.placeholder = "Neighbors needed";

startBtn.addEventListener ("click", async function() {
  if(neededNeighbors.value != null){
     gameOn = !gameOn; 
  }
  
  
});

randomizeBtn.addEventListener ("click", async function() {
  var board = [];

        var faceX = 0;
        ctx.clearRect(0, 0, c.width, c.height);
        
        for(let i = 0; i < boardwidth; i++){
            let sample = [];
                for(let j = 0; j < boardheight; j++){
                    sample.push(Math.round(Math.random()));
                }
            board.push(sample);
            
            } 
        for(var x = 0; x < boardwidth; x++){
            //console.log("pain"+x.toString())
            for(var y = 0; y < boardheight; y++){  
                        if(board[x][y] === 0){
                           ctx.beginPath();
                           ctx.fillRect(x*(c.width/boardwidth), y*(c.height/boardheight), c.width/boardwidth, c.height/boardheight); 
                            //ctx.rect(x*10, y*10, c.height/boardheight, c.width/boardwidth);
                           ctx.stroke();
                        }
                        
                        
                    }
                }
  
});
var body = document.getElementsByTagName("div")[0];
body.appendChild(startBtn);
body.appendChild(randomizeBtn)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function test(){
    while(true){
    while(gameOn){

        var board = [];

        var faceX = 0;
        ctx.clearRect(0, 0, c.width, c.height);
        
        for(let i = 0; i < boardwidth; i++){
            let sample = [];
                for(let j = 0; j < boardheight; j++){
                    sample.push(Math.round(Math.random()));
                }
            board.push(sample);
            
            } 


        for(var x = 0; x < boardwidth; x++){
            //console.log("pain"+x.toString())
            for(var y = 0; y < boardheight; y++){  
                        if(board[x][y] === 0){
                           ctx.beginPath();
                           ctx.fillRect(x*(c.width/boardwidth), y*(c.height/boardheight), c.width/boardwidth, c.height/boardheight); 
                            //ctx.rect(x*10, y*10, c.height/boardheight, c.width/boardwidth);
                           ctx.stroke();
                        }
                        
                        
                    }
                }

               await sleep(1000);
         
        }
        await sleep(1);
    }   
 
    }

test();  






