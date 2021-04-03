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
var board= [];

ctx.font = "30px Arial";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function random(gameboard){
        gameboard = [];

        var faceX = 0;
        ctx.clearRect(0, 0, c.width, c.height);
        
        for(let i = 0; i < boardwidth; i++){
            let sample = [];
                for(let j = 0; j < boardheight; j++){
                    sample.push(Math.round(Math.random()));
                }
            gameboard.push(sample);
            
            }
        return gameboard;
}
async function test(){
    
    while(true){

        board = random(board);
        
        for(var x = 0; x < boardwidth; x++){
            
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
    }   

test();

function NeighborCount(x,y ,board){
        var counter = 0;
       
        for(let row=-1;row<2;row++){
            for(let col = -1;col<2;col++){
                if ((x+row>=0)&& (y + col>=0 )&& (x+row<boardwidth)&& (y + col<boardheight ) && !(row==0&&col==0)){
                     counter += board[x+row][y+col];
                    }               
            }
        }    
        
        return counter;
    } 



